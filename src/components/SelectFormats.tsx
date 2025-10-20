import type { divisionsType } from "@/types";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandList, CommandGroup, CommandItem, CommandInput } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

const SelectFormats = ({
	setFormat,
	division,
}: {
	setFormat: React.Dispatch<React.SetStateAction<string>>;
	division: divisionsType;
}) => {
	const [open, setOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState<string>("");

	const formatItemsByDivision = {
		RED: [
			{ key: "14", label: "Personal Email" },
			{ key: "12", label: "Letter of Recommendation" },
			{ key: "13", label: "Interview Assessment" },
			{ key: "1", label: "Application Pending Review" },
			{ key: "2", label: "Application Shortlisted" },
			{ key: "3", label: "Application Denied - Criminal Record" },
			{ key: "4", label: "Application Denied - Input Reason(s)" },
			{ key: "5", label: "Application Denied - No Spots" },
			{ key: "6", label: "Application Pending Edit(s)" },
			{ key: "7", label: "Accepted for Interview" },
			{ key: "8", label: "Interview Scheduling Attempt" },
			{ key: "9", label: "Interview Scheduled" },
			{ key: "10", label: "Accepted for Academy" },
			{ key: "11", label: "Passed Academy" },
		],
		TSD: [],
		ATD: [],
	};

	const formats = formatItemsByDivision[division];

	return (
		<section className="gap-5 flex flex-col">
			<h2 className="md:text-3xl text-2xl font-[600] text-center">Response Formats ({division})</h2>

			<div className="w-full max-w-md mx-auto">
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
								<CommandGroup heading={`${division} Formats`}>
									{formats.map((item) => (
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
									))}
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
