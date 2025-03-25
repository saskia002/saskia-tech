import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/shadcn/tabs";
import { P } from "@/component/ui/custom/typography";
import { Suspense, JSX } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/shadcn/card";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/component/ui/shadcn/button";

export default function HomeBlogs(): JSX.Element {
	return (
		<Suspense fallback={<p>Loading feed...</p>}>
			<Tabs defaultValue="latest">
				<div className="max-xs:hidden">
					<TabsList className="flex w-full max-w-md">
						<TabsTrigger value="latest">Latest</TabsTrigger>
						<TabsTrigger value="dev">Development</TabsTrigger>
						<TabsTrigger value="other">Other</TabsTrigger>
					</TabsList>
				</div>
				<div className="min-xs:hidden">
					<TabsList className="flex flex-col w-full h-full *:w-full">
						<TabsTrigger value="latest">Latest</TabsTrigger>
						<TabsTrigger value="dev">Dev</TabsTrigger>
						<TabsTrigger value="other">Other</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="latest">
					<div className="flex flex-col gap-5 mt-2">
						<P>Here are the latest blogs</P>

						<Card className="w-full max-w-md">
							<div className="flex w-full">
								<CardHeader className="flex gap-3 flex-col w-full">
									<CardTitle>Java is not a epic language. foo bar foo bar foo bar foo bar foo bar foo bar</CardTitle>
									<CardDescription>01.01.1970</CardDescription>
								</CardHeader>
								<CardFooter className="m-0 py-0 px-4">
									<Button variant="ghost" size="icon" asChild>
										<Link href="/">
											<ChevronsRight className="size-6" />
										</Link>
									</Button>
								</CardFooter>
							</div>
						</Card>

						<Card className="w-full max-w-md">
							<div className="flex w-full">
								<CardHeader className="flex gap-3 flex-col w-full">
									<CardTitle>Python is a pretty epic language</CardTitle>
									<CardDescription>01.01.1970</CardDescription>
								</CardHeader>
								<CardFooter>
									<Button variant="outline" size="icon" asChild>
										<Link href={"/"}>
											<ChevronsRight />
										</Link>
									</Button>
								</CardFooter>
							</div>
						</Card>

						<Card className="w-full max-w-md">
							<CardHeader className="flex gap-3 flex-col">
								<CardTitle>Development proccess of saskia.tech</CardTitle>
								<CardDescription>01.01.1970</CardDescription>
							</CardHeader>
							<div className="flex">
								<CardContent className="w-full">
									<p>Epic blog</p>
								</CardContent>
								<CardFooter>
									<ChevronsRight />
								</CardFooter>
							</div>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="dev">dev</TabsContent>
				<TabsContent value="other">other</TabsContent>
			</Tabs>
		</Suspense>
	);
}
