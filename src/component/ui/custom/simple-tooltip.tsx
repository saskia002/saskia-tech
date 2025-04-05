import { JSX, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/tooltip";
import { cn } from "@/util/css-class-name-util";

type SimpleTooltipTooltipProps = {
	hint?: string | ReactNode;
	asChild?: boolean;
} & JSX.IntrinsicElements["div"];

export default function SimpleTooltip({ hint, children, className, asChild = false }: Readonly<SimpleTooltipTooltipProps>) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className={cn(className)} asChild={asChild}>
					{children}
				</TooltipTrigger>
				<TooltipContent>
					<div>{hint}</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
