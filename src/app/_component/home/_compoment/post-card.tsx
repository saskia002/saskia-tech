import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/component/ui/button";
import { capitalizeFirstLetter } from "@/util/string-util";
import { getServerSession } from "@/lib/auth/server-session";
import { fixDateFormat } from "@/util/date-util";

type BlogCardProps = {
	title: string;
	created: Date;
	description: string;
	link: string;
	category?: string;
	views: number;
	isPublic: boolean;
	createdAt: Date;
};

export default async function PostCard({ title, created, description, link, category, views, isPublic, createdAt }: Readonly<BlogCardProps>) {
	const auth = await getServerSession();

	const viewsString = `${views === 0 ? "0 views" : `${views} view${views > 1 ? "s" : ""}`}`;

	return (
		<article className="w-full max-w-2xl min-w-[220px]">
			<Card className="flex w-full flex-row">
				<div className="w-full gap-3 flex flex-col">
					<header className="w-full gap-3 flex flex-col">
						<CardHeader className="flex flex-col w-full pr-2">
							<h3 className="all-unset">
								<CardTitle>{title}</CardTitle>
							</h3>
							<CardDescription className="mt-1">
								<time dateTime={createdAt.toString()}>{`${fixDateFormat(createdAt)} EET`}</time>
							</CardDescription>
							<CardDescription className="mt-0">
								{category ? `${capitalizeFirstLetter(category)}, ${viewsString}` : viewsString}
								{auth && (isPublic ? ", public" : ", private")}
							</CardDescription>
						</CardHeader>
					</header>
					<CardContent>
						<p>{description}</p>
					</CardContent>
				</div>
				<CardFooter className="m-0 py-0 pr-4 pl-2">
					<Button variant="ghost" size="icon" asChild>
						<Link href={link} aria-label={`View post: ${title}`}>
							<ChevronsRight className="size-5.5" aria-hidden />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</article>
	);
}
