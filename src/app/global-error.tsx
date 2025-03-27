"use client"; // Error boundaries must be Client Components

import { Button } from "@/component/ui/button";

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
				<main className="w-full h-full flex justify-center">
					<section className="w-full max-w-3/4">
						<h2 className="mb-4">Something went wrong!</h2>
						<div>
							<Button onClick={() => reset()}> Try again </Button>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
