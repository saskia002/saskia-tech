"use client";

import { Button } from "@/component/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/shadcn/card";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
import { toast } from "sonner";

export default function Page() {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			toast.success("You have been logged out");
			router.push("/");
		}
	}, [status]);

	if (status === "loading") {
		return <Loading />;
	}

	return (
		<main className="w-full h-100 flex flex-col items-center">
			<section className="flex flex-col mt-5 w-full max-w-xs ">
				<div>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Logout</CardTitle>
							<CardDescription>Are you sure you want to log out?</CardDescription>
						</CardHeader>
						<CardContent>
							<Button onClick={() => signOut()} className="w-full text-wrap whitespace-break-spaces h-max">
								Yes
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}
