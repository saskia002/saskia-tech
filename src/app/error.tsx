"use client"; // Error boundaries must be Client Components

import { Button } from "@/component/ui/button";
import Link from "next/link";
import { useEffect } from "react";

type ErrorBoundaryProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: Readonly<ErrorBoundaryProps>) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<main className="w-full h-100 flex justify-center">
				<section className="w-4/6 max-w-[1000px] flex flex-col gap-3">
					<h2 className="mb-0!">Something went wrong!</h2>
					<p className="mt-0!">{error.digest}</p>
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
		</div>
	);
}
