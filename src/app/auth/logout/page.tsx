"use client";

import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { toast } from "sonner";

export async function Logout(): Promise<void> {
	const result = await signOut({ redirect: false, callbackUrl: "/" });

	if (!result.url) {
		throw new Error(`Logout Failed for some reason`);
	}
}

export default function Page() {
	const router = useRouter();
	const { status } = useSession();

	const handleAuth = async () => {
		await Logout()
			.then(() => {
				toast.success("You have been logged out");
				router.push("/");
			})
			.catch((error) => {
				console.error(error);
				toast.error("Logout failed, please try again");
			});
	};

	if (status === "loading") {
		return <Loading />;
	}

	return (
		<main className="w-full h-max inline-flex flex-col items-center mb-8">
			<section className="flex flex-col min-md:w-4/6 max-md:w-8/10 max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Logout</CardTitle>
						<CardDescription>Are you sure you want to log out?</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={() => handleAuth()} className="w-full text-wrap whitespace-break-spaces h-max">
							Yes
						</Button>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
