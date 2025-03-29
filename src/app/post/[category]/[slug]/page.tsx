import { DynamicPathParams, PageParams, Post } from "./model";
import { fixDateFormat } from "@/util/date-util";
import DOMPurify from "isomorphic-dompurify";
import { Separator } from "@/component/ui/separator";
import AdminControl from "./_component/admin-control";
import { getPost, incrementPostViewCount } from "./action";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth/server-session";
import { capitalizeFirstLetter } from "@/util/string-util";

export default async function Page({ params }: Readonly<PageParams>) {
	const auth = await getServerSession();
	const paramData: DynamicPathParams = await params;
	const post: Post | null = await getPost(paramData.category, paramData.slug);
	if (!post) {
		notFound();
	}
	await incrementPostViewCount(post.id);

	const sanitizedContent: string = DOMPurify.sanitize(post.content);

	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8">
			<section className="min-sm:w-4/6 max-w-[1000px] max-sm:w-8/10">
				<div className="block w-fit max-w-2xl">
					<h2>{post.title}</h2>
					{/*<p>{post.description}</p>
					<p className="mt-1!">{`${fixDateFormat(post.createdAt)} EET`}</p>*/}
					<p>{`${fixDateFormat(post.createdAt)} EET`}</p>
					<p className="mt-1!">{`${capitalizeFirstLetter(post.categoryCode)}, ${
						post.views === 0 ? "0 views" : `${post.views} view${post.views > 1 ? "s" : ""}`
					}`}</p>
					{auth && <p className="mt-1!">{post.isPublic ? "Public" : "Private"}</p>}
					<AdminControl postId={post.id} isPublic={post.isPublic} />
					<Separator className="mt-4 mb-6" />
				</div>
				<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
			</section>
		</main>
	);
}
