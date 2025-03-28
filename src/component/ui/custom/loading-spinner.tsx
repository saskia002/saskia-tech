export default function LoadingSpinner() {
	return (
		<div className="w-full h-max flex mt-10 justify-center">
			<div className="text-center">
				<div role="alert">
					<div className="animate-spin rounded-full h-24 w-24 border-t-3 border-b-3 border-zinc-400"></div>
				</div>
			</div>
		</div>
	);
}
