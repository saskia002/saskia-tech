import { Button } from "@/component/ui/shadcn/button";
import { H2, P } from "@/component/ui/custom/typography";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="w-full h-full flex justify-center">
			<section className="w-full max-w-3/4">
				<H2>Not Found</H2>
				<P className="mb-3">Could not find requested resource</P>
				<div>
					<Button asChild>
						<Link href="/">Return Home</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
