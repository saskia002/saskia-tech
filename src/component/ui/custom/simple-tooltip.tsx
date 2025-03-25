import { JSX, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/shadcn/tooltip";

type SimpleTooltipTooltipProps = {
	children?: ReactNode;
	hint?: string | ReactNode;
};

export default function SimpleTooltip({ hint, children }: Readonly<SimpleTooltipTooltipProps>): JSX.Element {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="cursor-help">{children}</TooltipTrigger>
				<TooltipContent>
					<p>{hint}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
