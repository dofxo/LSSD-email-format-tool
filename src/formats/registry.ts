import { REDFormats } from "./divisions/RED";
import { TSDFormats } from "./divisions/TSD";
import { ATDFormats } from "./divisions/ATD";
import { GeneralFormats } from "./divisions/General";
import { SupervisoryFormats } from "./divisions/Supervisory";

export const registry = {
	RED: REDFormats,
	TSD: TSDFormats,
	ATD: ATDFormats,
	General: GeneralFormats,
	Supervisory: SupervisoryFormats,
};
