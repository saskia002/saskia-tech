import { Button } from "@/component/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="w-full h-full flex justify-center">
			<section className="w-full max-w-3/4">
				<h2>Not Found</h2>
				<p className="mb-3">Could not find requested resource</p>
				<Button asChild>
					<Link href="/">Return to Homepage</Link>
				</Button>
			</section>
		</main>
	);
}
