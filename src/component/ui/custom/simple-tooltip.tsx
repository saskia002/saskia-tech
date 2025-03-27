import { JSX, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/tooltip";

type SimpleTooltipTooltipProps = {
	children?: ReactNode;
	hint?: string | ReactNode;
};

export default function SimpleTooltip({ hint, children }: Readonly<SimpleTooltipTooltipProps>) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="cursor-help">{children}</TooltipTrigger>
				<TooltipContent>
					<div>{hint}</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
