// Dumps all 8 FTB formats with empty FormatData for 1:1 verification. Run with npx tsx.
import { FTBFormats, FTBLabels } from "../src/formats/divisions/FTB";
import type { FormatData } from "../src/types";

const f = {} as FormatData;
let out = "";
for (const id of Object.keys(FTBLabels)) {
	const { formats } = FTBFormats({ formatId: id, formatData: f, deputyData: { name: "", signature: "", dRank: "", divisionRanks: { RED: "", TSD: "", ATD: "", General: "", Supervisory: "", FTB: "" } } });
	out += `\n\n########## FORMAT ${id} - ${FTBLabels[id]} ##########\n`;
	out += formats[id].text;
}
console.log(out);
