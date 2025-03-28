"use client";

import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { useSession, signIn } from "next-auth/react";
import Loading from "./loading";
import { toast } from "sonner";

export async function Login(type: string): Promise<void> {
	const result = await signIn(type, { redirect: true, callbackUrl: "/" });

	if (result?.error) {
		throw new Error(`Login Failed: ${result?.error}`);
	}
}

export default function Page() {
	const { status } = useSession();

	const handleAuth = async () => {
		await Login("github")
			.then(() => {
				toast.success("You have been logged in");
			})
			.catch((error) => {
				console.error(error);
				toast.error("Login failed, please try again");
			});
	};

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
							<Button className="w-full text-wrap whitespace-break-spaces h-max" onClick={() => handleAuth()}>
								Login with GitHub
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}
