import { ReactNode } from "react";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/tooltip";

type HeaderNavLinkProps = {
	href: string;
	replace?: boolean;
	prefetch?: boolean;
	tooltipEnabled?: boolean;
	tooltipText?: string;
	children: ReactNode;
};

export default function HeaderNavLink({ href, replace = false, prefetch = true, tooltipEnabled = false, tooltipText, children }: Readonly<HeaderNavLinkProps>) {
	if (tooltipEnabled) {
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
						<div>
							{!!tooltipText
								? tooltipText
								: ((_href) => {
										const splitHref = _href.split("/")[1];
										return splitHref.charAt(0).toUpperCase() + splitHref.slice(1);
								  })(href)}
						</div>
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
