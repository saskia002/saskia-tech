"use client"; // Error boundaries must be Client Components

import { Button } from "@/component/ui/button";
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
				<section className="w-4/6 max-w-[1000px]">
					<h2 className="mb-4">Something went wrong!</h2>
					<div>
						<Button onClick={() => reset()}> Try again </Button>
					</div>
				</section>
			</main>
		</div>
	);
}
