import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/component/ui/button";
import { fixDateFormat } from "@/util/date-util";
import { capitalizeFirstLetter } from "@/util/string-util";
import { getServerSession } from "@/lib/auth/server-session";

type BlogCardProps = {
	title: string;
	created: Date;
	description: string;
	link: string;
	category?: string;
	views: number;
	isPublic: boolean;
};

export default async function PostCard({ title, created, description, link, category, views, isPublic }: Readonly<BlogCardProps>) {
	const auth = await getServerSession();

	return (
		<Card className="w-full max-w-2xl min-w-[220px]">
			<div className="flex w-full flex-row">
				<div className="w-full gap-3 flex flex-col">
					<CardHeader className="flex flex-col w-full pr-2">
						<CardTitle>{title}</CardTitle>
						<CardDescription>{category ? `${capitalizeFirstLetter(category)}, ${views} views` : `${views} views`}</CardDescription>
						{auth && <CardDescription>{isPublic ? "Public" : "Private"}</CardDescription>}
					</CardHeader>
					<CardContent>
						<p>{description}</p>
					</CardContent>
				</div>
				<CardFooter className="m-0 py-0 pr-4 pl-2">
					<Button variant="ghost" size="icon" asChild>
						<Link href={link}>
							<ChevronsRight className="size-5.5" />
						</Link>
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}
