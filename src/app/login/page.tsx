"use client";

import { Button } from "@/component/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/shadcn/card";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loading from "./loading";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Page() {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "authenticated") {
			toast.success("You have been logged in");
			router.push("/");
		}
	}, [status]);

	if (status === "loading") {
		return <Loading />;
	}

	return (
		<main className="w-full h-100 flex flex-col items-center">
			<section className="flex flex-col mt-5 w-full max-w-xs">
				<div>
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>* Only GitHub OAuth is supported</CardDescription>
						</CardHeader>
						<CardContent>
							{/*<Button className="w-full text-wrap whitespace-break-spaces h-max mb-3" onClick={() => signIn("google")}>
								Login with Google
							</Button>*/}
							<Button className="w-full text-wrap whitespace-break-spaces h-max" onClick={() => signIn("github")}>
								Login with GitHub
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}
