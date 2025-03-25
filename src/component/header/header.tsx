import { ThemeToggle } from "@/component/ui/custom/theme-toggle";
import Link from "next/link";
import { Button } from "@/component/ui/shadcn/button";
import HeaderLinks from "@/component/header/header-links";

export default function Header() {
	return (
		<header className="flex w-full h-12 min-w-0 justify-center items-center py-3 mb-6 max-md:px-4 min-md:px-16 max-xs:px-0">
			<div className="flex w-100 min-w-0 justify-between items-center flex-1 max-w-[1200px]">
				<Button variant="link" className="text-xl font-bold leading-none" asChild>
					<Link href="/" replace={true}>
						<h1 className="p-0 m-0">Saskia's Website</h1>
					</Link>
				</Button>
				<div className="flex gap-2">
					<HeaderLinks />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
