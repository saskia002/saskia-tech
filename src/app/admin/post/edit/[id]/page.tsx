"use client";

import { useSession } from "next-auth/react";

import { toast } from "sonner";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			toast.success("You must be logged in to edit a blog");
			router.push("/");
		},
	});

	if (status === "loading") {
		return <Loading />;
	}

	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8">
			<section className="flex flex-col w-4/6 max-w-[1000px] gap-4">
				<p>edit</p>
			</section>
		</main>
	);
}
