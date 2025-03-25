import { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

type H2Props = {
	children: ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H2({ className, children, ...props }: Readonly<H2Props>): JSX.Element {
	return (
		<h2 className={cn("scroll-m-20 mb-3 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>
			{children}
		</h2>
	);
}
