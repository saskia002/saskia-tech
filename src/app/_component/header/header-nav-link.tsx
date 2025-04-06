import { ReactNode } from "react";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/tooltip";

type HeaderNavLinkProps = {
	href: string;
	replace?: boolean;
	prefetch?: boolean;
	tooltip?: boolean;
	tooltipText?: string;
	children: ReactNode;
	ariaLabel?: string;
};

export default function HeaderNavLink({
	href,
	replace = false,
	prefetch = true,
	tooltip = false,
	tooltipText,
	children,
	ariaLabel,
}: Readonly<HeaderNavLinkProps>) {
	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="link" asChild className="px-0 py-0 has-[>svg]:px-0">
							<Link href={href} replace={replace} prefetch={prefetch} aria-label={ariaLabel}>
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
			<Link href={href} replace={replace} prefetch={prefetch} aria-label={ariaLabel}>
				{children}
			</Link>
		</Button>
	);
}
