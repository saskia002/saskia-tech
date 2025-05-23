import { Button } from "@/component/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Not Found",
	description: "Could not find requested resource",
};

export default function NotFound() {
	return (
		<main className="w-full h-100 flex justify-center">
			<section className="w-4/6 max-w-[1000px]">
				<h2>Not Found</h2>
				<p className="mb-3">Could not find requested resource</p>
				<Button asChild>
					<Link href="/">Return to Homepage</Link>
				</Button>
			</section>
		</main>
	);
}
