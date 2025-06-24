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

function getUndefinedCodeBlock(lines: string[]): string {
	return lines
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
}

function highlightCode(code: string, language: string): string {
	const languageLower = language.toLowerCase().trim();
	const Prism = require("prismjs");

	const tempCode: string[] = code.trim().split("\n");
	tempCode.shift();

	try {
		require(`prismjs/components/prism-${languageLower}`);

		code = tempCode
			.map((line: string) => {
				if (line === "") {
					return ``;
				}

				line = line.replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim();

				return `${Prism.highlight(line, Prism.languages[languageLower], languageLower)}`;
			})
			.join("\n");
	} catch (_) {
		return code;
	}

	return code;
}

function getCodeBlockByLanguage(language: string, lines: string[], openingTag: string, closingTag: string): string {
	const languageLower = language.toLowerCase().trim();

	const Prism = require("prismjs");
	try {
		require(`prismjs/components/prism-${languageLower}`);
	} catch (_) {
		return `<pre>${getUndefinedCodeBlock(lines)}</pre>`;
	}

	if (lines.length > 2) {
		lines.shift();
		lines.pop();
	}

	const wrappedCode = lines
		.map((line: string) => {
			if (line.trim() === "") {
				return `ϴ___empty_line___ϴ`;
			}

			return `ϴ___temp_code_block___ϴ${line}ϴ___temp_code_block_end___ϴ`;
		})
		.join("\n");

	const code = Prism.highlight(wrappedCode, Prism.languages[languageLower], languageLower)
		.replaceAll(/ϴ___temp_code_block___ϴ/g, "<code>")
		.replaceAll(/ϴ___temp_code_block_end___ϴ/g, "</code>")
		.replaceAll(/ϴ___empty_line___ϴ/g, "<code></code>");

	return `${openingTag.replace(/data-language="plain"/, `data-language="${languageLower}"`)}${code}${closingTag}`;
}

function getParsedHtml(content: string): string {
	return DOMPurify.sanitize(content)
		.replaceAll(/\u00A0/g, " ")
		.replaceAll("&nbsp;", " ")
		.replaceAll(/```([^`]*)```|``([^`]*)``|`([^`]*)`/g, (match, tripleContent, doubleContent, singleContent) => {
			const codeContent: string = (tripleContent ?? doubleContent ?? singleContent ?? "").replaceAll(/<p>/g, "").replaceAll(/<\/p>/g, "\n").trim();

			const langRegex: RegExp = /`{1,3}(\w+)/;
			const language: string | undefined =
				!!doubleContent || !!tripleContent ? langRegex.exec(match.replaceAll(/<p>/g, "").replaceAll(/<\/p>/g, "\n").split("\n")[0])?.[1] : undefined;

			const finalCode: string = language ? highlightCode(codeContent, language) : codeContent;

			const dataLaguageProperty: string = language ? `data-language="${language.toLowerCase()}"` : "";

			if (tripleContent) {
				return `<pre class="overflow-x-auto"><md-code class="md-code-multiline" ${dataLaguageProperty}>${finalCode}</md-code></pre>`;
			}

			if (doubleContent) {
				return `<div class="overflow-x-auto"><md-code class="md-code-multiline" ${dataLaguageProperty}>${finalCode}</md-code></div>`;
			}

			return `<md-code class="md-code-singleline" ${dataLaguageProperty}>${finalCode}</md-code>`;
		})
		.replaceAll(/(<pre[^>]*>)([^<]*)(<\/pre>)/g, (match, openingTag, codeContent, closingTag) => {
			const lines: string[] = codeContent.split("\n");

			if (lines.length === 0) {
				return match;
			}

			const language = lines[0].trim().toLowerCase();

			return getCodeBlockByLanguage(language, lines, openingTag, closingTag);
		})

		.replaceAll("<p></p>", '<div class="my-3 leading-0">&nbsp;</div>')
		.replaceAll(/<a\s+([^>]+)>/g, "<a class='underline' $1>");
}

export default async function Page({ params }: Readonly<PageParams>) {
	const auth = await getServerSession();
	const paramData: DynamicPathParams = await params;
	const post: Post | null = await getPost(paramData.category, paramData.slug);
	if (!post) {
		notFound();
	}
	await incrementPostViewCount(post.id);

	const sanitizedContent: string = getParsedHtml(post.content);

	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8 mb-8">
			<article className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10">
				<div className="max-w-fit">
					<div className="max-w-3xl ">
						<header className="block mb-6 ">
							{/*<hgroup>*/}
							<h2>{post.title}</h2>
							{/*</hgroup>*/}
							<p>
								<time dateTime={post.createdAt.toString()}>{`${fixDateFormat(post.createdAt)} EET`}</time>
							</p>
							<p className="mt-2!">
								{`${capitalizeFirstLetter(post.categoryCode)}, ${
									post.views === 0 ? "0 views" : `${post.views} view${post.views > 1 ? "s" : ""}`
								}`}
							</p>
							{auth && <p className="mt-2!">{post.isPublic ? "Public" : "Private"}</p>}
							<AdminControl postId={post.id} isPublic={post.isPublic} />
							<Separator className="mt-4" />
						</header>

						<section dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
					</div>
				</div>
			</article>
		</main>
	);
}
