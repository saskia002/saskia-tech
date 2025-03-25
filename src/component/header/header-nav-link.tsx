import { JSX, ReactNode } from "react";
import { Button } from "@/component/ui/shadcn/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/shadcn/tooltip";

type HeaderNavLinkProps = {
	href: string;
	replace?: boolean;
	prefetch?: boolean;
	tooltip?: boolean;
	children: ReactNode;
};

export default function HeaderNavLink({ href, replace = false, prefetch = true, tooltip = false, children }: Readonly<HeaderNavLinkProps>): JSX.Element {
	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="link" asChild className="px-0 py-0 has-[>svg]:px-0">
							<Link href={href} replace={replace} prefetch={prefetch}>
								{children}
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>
							{((_href) => {
								const splitHref = _href.split("/")[1];
								return splitHref.charAt(0).toUpperCase() + splitHref.slice(1);
							})(href)}
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}
	return (
		<Button variant="link" asChild className="px-0 py-0 has-[>svg]:px-0">
			<Link href={href} replace={replace} prefetch={prefetch}>
				{children}
			</Link>
		</Button>
	);
}
