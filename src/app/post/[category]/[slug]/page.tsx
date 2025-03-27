import { DynamicPathParams, PageParams, PostData } from "./model";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { fixDateFormat } from "@/util/date-util";
import DOMPurify from "isomorphic-dompurify";
import { Separator } from "@/component/ui/separator";
import AdminControl from "./_component/admin-control";
import { getPost, incrementPostViewCount } from "./actions";

export default async function Page({ params }: Readonly<PageParams>) {
	const paramData: DynamicPathParams = await params;
	let post!: PostData;

	const data: PostData | null = await getPost(paramData);
	if (data) {
		post = data;
		await incrementPostViewCount(data.id);
	}

	if (!post) {
		return (
			<main className="w-full h-full flex justify-center">
				<section className="w-full max-w-3/4">
					<h2>Not Found</h2>
					<p className="mb-3">Could not find requested post</p>
					<Button asChild>
						<Link href="/">Return to Homepage</Link>
					</Button>
				</section>
			</main>
		);
	}

	const sanitizedContent: string = DOMPurify.sanitize(post.content);

	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8">
			<section className="flex flex-col w-4/6 max-w-[1000px]">
				<div className="block w-fit max-w-2xl">
					<h2 className="text-balance">{post.title}</h2>
					<p>{`${fixDateFormat(post.createdAt)} EET`}</p>
					<p className="mt-1!">{`${post.categoryCode}, ${post.views} views`}</p>
					<AdminControl postId={post.id} />
					<Separator className="mt-4 mb-6" />
				</div>
				<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
			</section>
		</main>
	);
}
