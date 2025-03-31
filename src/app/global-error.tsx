"use client"; // Error boundaries must be Client Components

import { Button } from "@/component/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Error",
	description: "Something went wrong",
};

type GlobalErrorBoundaryProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

// Error boundaries must be Client Components
export default function GlobalError({ error, reset }: Readonly<GlobalErrorBoundaryProps>) {
	return (
		// global-error must include html and body tags
		<html lang="en">
			<body>
				<main className="w-full h-100 flex justify-center">
					<section className="w-4/6 max-w-[1000px] flex flex-col gap-3">
						<h2 className="mb-0!">Something went wrong!</h2>
						<p className="mt-0!">{`Error: ${error.digest}`}</p>
						<div className="flex gap-3 mt-1">
							<Button onClick={() => reset()} variant="outline">
								Try again
							</Button>
							<Button asChild>
								<Link href="/">Return to homepage</Link>
							</Button>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
