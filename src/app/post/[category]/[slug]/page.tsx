import { DynamicPathParams, PageParams, Post } from "./model";
import { fixDateFormat } from "@/util/date-util";
import DOMPurify from "isomorphic-dompurify";
import { Separator } from "@/component/ui/separator";
import AdminControl from "./_component/admin-control";
import { getPost, incrementPostViewCount } from "./action";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth/server-session";
import { capitalizeFirstLetter } from "@/util/string-util";
import "prismjs/themes/prism.min.css";

export default async function Page({ params }: Readonly<PageParams>) {
	const auth = await getServerSession();
	const paramData: DynamicPathParams = await params;
	const post: Post | null = await getPost(paramData.category, paramData.slug);
	if (!post) {
		notFound();
	}
	await incrementPostViewCount(post.id);

	const sanitizedContent: string = DOMPurify.sanitize(post.content)
		.replaceAll(/\u00A0/g, " ")
		.replaceAll("<p></p>", '<div class="my-4">&nbsp;</div>')
		.replaceAll("&nbsp;", " ")
		.replaceAll(/(<pre[^>]*>)([^<]*)(<\/pre>)/g, (match, openingTag, codeContent, closingTag) => {
			const Prism = require("prismjs");
			const lines = codeContent.split("\n");
			if (lines.length === 0) {
				return match;
			}

			const language = lines[0].trim().toLowerCase();

			try {
				require(`prismjs/components/prism-${language}`);
			} catch (e) {
				const wrappedCode = lines

					.map((line: string) => {
						if (line.trim() === "") {
							return `<code></code>`;
						}

						if (/<code[^>]*>.*<\/code>/.test(line)) {
							return line;
						}

						return `<code>${line}</code>`;
					})

					.join("\n");

				return `<pre>${wrappedCode}</pre>`;
			}

			if (lines.length > 2) {
				lines.shift();
				lines.pop();
			}

			const wrappedCode = lines
				.map((line: string) => {
					if (line.trim() === "") {
						return `ϴ___non_breaking_space___ϴ`;
					}

					return `ϴ___temp___ϴ${line}ϴ___temp_end___ϴ`;
				})
				.join("\n");

			const code = Prism.highlight(wrappedCode, Prism.languages[language], language)
				.replaceAll(/ϴ___temp___ϴ/g, "<code>")
				.replaceAll(/ϴ___temp_end___ϴ/g, "</code>")
				.replaceAll(/ϴ___non_breaking_space___ϴ/g, "<code></code>");

			return `${openingTag}${code}${closingTag}`;
		});

	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8 mb-8">
			<article className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10">
				<div className="flex flex-col max-w-3xl w-fit">
					<header className="block mb-6 ">
						{/*<hgroup>*/}
						<h2>{post.title}</h2>
						{/*</hgroup>*/}
						<p>
							<time dateTime={post.createdAt.toString()}>{`${fixDateFormat(post.createdAt)} EET`}</time>
						</p>
						<p className="mt-2!">{`${capitalizeFirstLetter(post.categoryCode)}, ${
							post.views === 0 ? "0 views" : `${post.views} view${post.views > 1 ? "s" : ""}`
						}`}</p>
						{auth && <p className="mt-2!">{post.isPublic ? "Public" : "Private"}</p>}
						<AdminControl postId={post.id} isPublic={post.isPublic} />
						<Separator className="mt-4" />
					</header>

					<section dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
				</div>
			</article>
		</main>
	);
}
