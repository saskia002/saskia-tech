import { cn } from "@/lib/utils";
import { ReactNode, JSX } from "react";

type PProps = {
	children?: ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function P({ className, children, ...props }: Readonly<PProps>): JSX.Element {
	return (
		<p className={cn("text-base [&:not(:first-child)]:mt-3 first:mt-0 leading-6", className)} {...props}>
			{children}
		</p>
	);
}
