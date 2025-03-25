"use client";
import { Button } from "@/component/ui/shadcn/button";
import { H2 } from "@/component/ui/custom/typography";

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
						<H2 className="mb-4">Something went wrong!</H2>
						<div>
							<Button onClick={() => reset()}> Try again </Button>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
