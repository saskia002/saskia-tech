"use client";

import { Button } from "@/component/ui/button";

import { useSession, signIn } from "next-auth/react";
import Loading from "./loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/component/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/component/ui/form";

const FormSchema = z.object({
	username: z.string().min(3, {
		message: "Username must be at least 3 characters.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

type FormData = z.infer<typeof FormSchema>;

export async function Login(formdata: FormData): Promise<void> {
	const { username, password } = formdata;

	const result = await signIn("credentials", {
		username,
		password,
		redirect: false,
	});

	if (result?.error) {
		throw new Error(`Login Failed: ${result?.error}`);
	}
}

export default function Page() {
	const router = useRouter();
	const { status } = useSession();

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		Login(data)
			.then(() => {
				toast.success("You have been logged in");
				router.push("/");
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
		<main className="w-full h-max inline-flex flex-col items-center mb-8">
			<section className="flex flex-col min-md:w-4/6 max-md:w-8/10 max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Enter your username below to login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-4">
									<FormField
										control={form.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username *</FormLabel>
												<FormControl>
													<Input placeholder="admin" {...field} type="text" required />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password *</FormLabel>
												<FormControl>
													<Input placeholder="admin" {...field} type="password" required />
												</FormControl>
											</FormItem>
										)}
									/>
									<Button type="submit" className="w-full mt-1" disabled={form.formState.isSubmitting}>
										Login
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
