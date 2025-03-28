import { Button } from "@/component/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="w-full h-100 flex justify-center">
			<section className="w-4/6 max-w-[1000px]">
				<h2>Not Found</h2>
				<p className="mb-3">Could not find requested post</p>
				<Button asChild>
					<Link href="/">Return to Homepage</Link>
				</Button>
			</section>
		</main>
	);
}
