import type { divisionsType } from "@/types";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandList, CommandGroup, CommandItem, CommandInput } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { REDLabels } from "@/formats/divisions/RED";
import { TSDLabels } from "@/formats/divisions/TSD";
import { ATDLabels } from "@/formats/divisions/ATD";
import { GeneralLabels } from "@/formats/divisions/General";

const SelectFormats = ({
	setFormat,
	division,
}: {
	setFormat: React.Dispatch<React.SetStateAction<string>>;
	division: divisionsType;
}) => {
	const [open, setOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState<string>("");

	useEffect(() => {
		setSelectedLabel("");
	}, [division]);

	const formatItemsByDivision = {
		RED: Object.entries(REDLabels).map(([key, label]) => ({
			key,
			label,
		})),
		TSD: Object.entries(TSDLabels).map(([key, label]) => ({
			key,
			label,
		})),
		ATD: Object.entries(ATDLabels).map(([key, label]) => ({
			key,
			label,
		})),
		General: Object.entries(GeneralLabels).map(([key, label]) => ({
			key,
			label,
		})),
	};

	const formats = formatItemsByDivision[division];

	return (
		<section className="gap-5 flex flex-col">
			<h2 className="md:text-3xl text-2xl font-[600] text-center">Response Formats ({division})</h2>

			<div className="w-full mx-auto">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-full justify-between"
						>
							{selectedLabel ? selectedLabel : "Select a Response Format"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput placeholder="Search format..." />
							<CommandList>
								<CommandGroup>
									{formats.length > 0 ? (
										formats.map((item) => (
											<CommandItem
												key={item.key}
												value={item.label}
												onSelect={() => {
													setFormat(item.key);
													setSelectedLabel(item.label);
													setOpen(false);
												}}
											>
												{item.label}
											</CommandItem>
										))
									) : (
										<span className="text-[12px] text-yellow-500">No formats available</span>
									)}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</section>
	);
};

export default SelectFormats;
