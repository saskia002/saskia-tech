import { JSX } from "react";

export default function LoadingSpinner(): JSX.Element {
	return (
		<main className="w-full h-full flex mt-10 justify-center">
			<section className="text-center">
				<div role="alert">
					<div className="animate-spin rounded-full h-24 w-24 border-t-3 border-b-3 border-zinc-400"></div>
				</div>
			</section>
		</main>
	);
}
