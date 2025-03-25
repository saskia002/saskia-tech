"use client"; // Error boundaries must be Client Components

import { Button } from "@/component/ui/shadcn/button";
import { H2 } from "@/component/ui/custom/typography";
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
			<main className="w-full h-full flex justify-center">
				<section className="w-full max-w-3/4">
					<H2 className="mb-4">Something went wrong!</H2>
					<div>
						<Button onClick={() => reset()}> Try again </Button>
					</div>
				</section>
			</main>
		</div>
	);
}
