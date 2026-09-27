/**
 * Packages ./extension into public/lssd-format-tool.zip so the web app can
 * offer the browser extension as a one-click download.
 *
 * Everything is nested under a single ROOT_FOLDER, so unzipping gives one
 * tidy folder to point "Load unpacked" at rather than a bundle of loose files.
 *
 * Chrome only needs a valid ZIP, so this writes a stored (uncompressed) archive
 * with Node's built-ins — no extra dependency, cross-platform, and fast enough
 * to run before every dev/build.
 */
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Folder every entry is nested inside, and the name of the archive itself. */
const BUNDLE_NAME = "lssd-format-tool";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "extension");
const outputDir = join(root, "public");
const outputFile = join(outputDir, `${BUNDLE_NAME}.zip`);

/** Every file under `dir`, sorted, as { name (POSIX relative path), data }. */
const collect = (dir, base = dir) => {
	const files = [];
	for (const entry of readdirSync(dir).sort()) {
		if (entry.startsWith(".")) continue;
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) files.push(...collect(full, base));
		else
			files.push({
				name: `${BUNDLE_NAME}/${relative(base, full).split("\\").join("/")}`,
				data: readFileSync(full),
			});
	}
	return files;
};

const crcTable = (() => {
	const table = new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		table[n] = c >>> 0;
	}
	return table;
})();

const crc32 = (buffer) => {
	let c = 0xffffffff;
	for (let i = 0; i < buffer.length; i++) c = crcTable[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
};

/** MS-DOS packed date/time for the archive's fixed timestamp. */
const dosDateTime = (date) => ({
	time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
	day: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
});

const files = collect(sourceDir);
if (files.length === 0) {
	console.error("[ext] No files found in extension/. Nothing to package.");
	process.exit(1);
}

const { time, day } = dosDateTime(new Date());
const parts = [];
const central = [];
let offset = 0;

for (const file of files) {
	const name = Buffer.from(file.name, "utf8");
	const crc = crc32(file.data);
	const size = file.data.length;

	const local = Buffer.alloc(30);
	local.writeUInt32LE(0x04034b50, 0);
	local.writeUInt16LE(20, 4);
	local.writeUInt16LE(0, 6);
	local.writeUInt16LE(0, 8); // stored
	local.writeUInt16LE(time, 10);
	local.writeUInt16LE(day, 12);
	local.writeUInt32LE(crc, 14);
	local.writeUInt32LE(size, 18);
	local.writeUInt32LE(size, 22);
	local.writeUInt16LE(name.length, 26);
	local.writeUInt16LE(0, 28);

	const entry = Buffer.alloc(46);
	entry.writeUInt32LE(0x02014b50, 0);
	entry.writeUInt16LE(20, 4);
	entry.writeUInt16LE(20, 6);
	entry.writeUInt16LE(0, 8);
	entry.writeUInt16LE(0, 10); // stored
	entry.writeUInt16LE(time, 12);
	entry.writeUInt16LE(day, 14);
	entry.writeUInt32LE(crc, 16);
	entry.writeUInt32LE(size, 20);
	entry.writeUInt32LE(size, 24);
	entry.writeUInt16LE(name.length, 28);
	entry.writeUInt16LE(0, 30);
	entry.writeUInt16LE(0, 32);
	entry.writeUInt16LE(0, 34);
	entry.writeUInt16LE(0, 36);
	entry.writeUInt32LE(0, 38);
	entry.writeUInt32LE(offset, 42);

	parts.push(local, name, file.data);
	central.push(entry, name);
	offset += local.length + name.length + size;
}

const centralBuffer = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(0, 4);
end.writeUInt16LE(0, 6);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuffer.length, 12);
end.writeUInt32LE(offset, 16);
end.writeUInt16LE(0, 20);

mkdirSync(outputDir, { recursive: true });
const archive = Buffer.concat([...parts, centralBuffer, end]);
writeFileSync(outputFile, archive);

console.log(
	`[ext] Packaged ${files.length} files into public/${BUNDLE_NAME}.zip under ${BUNDLE_NAME}/ (${archive.length} bytes)`,
);
