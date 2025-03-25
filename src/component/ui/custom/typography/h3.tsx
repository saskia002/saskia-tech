import { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

type H3Props = {
	children?: ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H3({ className, children, ...props }: H3Props): JSX.Element {
	return (
		<h3 className={cn("scroll-m-20 mb-3 text-2xl font-semibold tracking-tight", className)} {...props}>
			{children}
		</h3>
	);
}
