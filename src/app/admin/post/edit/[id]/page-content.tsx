"use client";

import { Category, LocalStoragePostData, Post } from "./model";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import ReactQuill, { DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { reziseImage } from "@/util/image-util";
import { updatePost } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fixDateFormat } from "@/util/date-util";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select";
import { RefreshCcw, Trash2 } from "lucide-react";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";

type PagecontentProps = {
	post: Post;
	categories: Category[];
};

export default function Pagecontent({ post, categories }: Readonly<PagecontentProps>) {
	const router = useRouter();
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);
	const quillRef = useRef<ReactQuill | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isFormPending, startTransition] = useTransition();
	const [quillInitData, setQuillInitData] = useState<DeltaStatic | string>("");

	const imageHandler = () => {
		if (!window?.document) return;

		const input = window?.document?.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.style.display = "hidden";
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (!file) return;

			if (file?.size > 2 * 1024 * 1024) {
				toast.error(`File is too large! Please select a file smaller than 2MB.`);
				return;
			}

			const userWidth = prompt("Enter the width for resizing the image\n(default: full width):", "0");
			const width = userWidth ? parseInt(userWidth, 10) : 300;

			await reziseImage(file, width === 0 ? undefined : width)
				.then((base46Img) => {
					const range = quillRef.current?.getEditor().getSelection();
					if (range) {
						quillRef.current?.getEditor().insertEmbed(range.index, "image", base46Img);
					}
				})
				.catch((error) => {
					console.error("Error uploading image:", error);
					toast.error(`Failed to load image: ${error}`);
				});
		};
	};

	const modules = {
		//syntax: true, // Enable syntax highlighting
		toolbar: {
			container: [
				[{ header: [3, 4, 5, 6, false] }], // Removed 1 and 2, beacuse the navbar title is h2 and page title should be always h2
				[{ color: [] }, { background: [] }],
				["bold", "italic", "underline", "strike"],
				[{ script: "sub" }, { script: "super" }],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ indent: "-1" }, { indent: "+1" }, { align: [] }],
				["blockquote", "code-block"],
				["link", "image"], // ,"video"
				[{ align: [] }],
				["clean"],
			],
			handlers: {
				image: imageHandler, // Custom image handler
			},
		},
	};

	if (ReactQuill && typeof typeof window !== "undefined") {
		const submitAction = async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			formData.append("content", quillRef.current?.getEditor().getSemanticHTML() ?? "");

			startTransition(async () => {
				await updatePost(post.id, formData)
					.then(() => {
						toast.success("Post saved successfully!");
						router.push("/");
					})
					.catch((error) => {
						toast.error(`Failed to save post. Please try again.\n${error}`);
					});
			});
		};

		// Restore Editor state on load
		// TODO: fix category dropdown not setting value correctly
		useEffect(() => {
			const form = formRef?.current;

			if (form) {
				const title = form.querySelector('[name="title"]') as HTMLInputElement;
				const description = form.querySelector('[name="description"]') as HTMLInputElement;
				const category = form.querySelector('[name="category"]') as HTMLInputElement;
				const jsonData = getLocalStoragePostData();

				if (jsonData) {
					title.value = post.title;
					description.value = post.description;
					category.value = post.categoryCode;
					setQuillInitData(post.content ?? "");
				}
			}
		}, []);

		const getLocalStoragePostData = (): LocalStoragePostData | undefined => {
			const data = localStorage.getItem("ADMIN_POST_EDITOR_DATA");
			return data ? JSON.parse(data) : undefined;
		};

		const clearCache = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			localStorage.removeItem("ADMIN_POST_EDITOR_DATA");
			location.reload();
		};

		const loadFromCache = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			const form = formRef?.current;

			if (form) {
				const title = form.querySelector('[name="title"]') as HTMLInputElement;
				const description = form.querySelector('[name="description"]') as HTMLInputElement;
				const category = form.querySelector('[name="category"]') as HTMLInputElement;
				const jsonData = getLocalStoragePostData();

				if (jsonData) {
					title.value = jsonData.title;
					description.value = jsonData.description;
					category.value = jsonData.category;
					setQuillInitData(jsonData.content ?? "");
				}
			}
		};

		// Autosave editor after each 10 seconds
		useEffect(() => {
			const intervalId = setInterval(() => {
				if (formRef.current) {
					const formData = new FormData(formRef.current);

					const jsonData: LocalStoragePostData = {
						title: formData.get("title") as string,
						description: formData.get("description") as string,
						category: formData.get("category") as string,
						content: quillRef.current?.getEditor().getContents(),
					};

					localStorage.setItem("ADMIN_POST_EDITOR_DATA", JSON.stringify(jsonData));
				}
			}, 10000);

			return () => clearInterval(intervalId);
		}, []);

		return (
			<main className="w-full h-max inline-flex flex-col items-center mb-8">
				<section className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10">
					<form ref={formRef} className="flex flex-col gap-4" onSubmit={submitAction}>
						<div className="flex w-full justify-between gap-3 mb-3 flex-wrap">
							<div className="flex gap-3 flex-wrap">
								<SimpleTooltip hint="Clear cache" asChild>
									<Button variant="ghost" type="reset" onClick={(e) => clearCache(e)} disabled={isFormPending}>
										<Trash2 />
									</Button>
								</SimpleTooltip>

								<SimpleTooltip hint="Load cache" asChild>
									<Button variant="ghost" type="reset" onClick={(e) => loadFromCache(e)} disabled={isFormPending}>
										<RefreshCcw />
									</Button>
								</SimpleTooltip>
							</div>
							<Button type="submit" disabled={isFormPending}>
								Update
							</Button>
						</div>
						<div className="block w-fit max-w-2xl mb-4">
							<p>{`${fixDateFormat(post.createdAt)} EET`}</p>
							<p className="mt-1!">{`${post.categoryCode}, ${post.views} views`}</p>
							<p className="mt-1!">{post.isPublic ? "Public" : "Private"}</p>
						</div>
						<div>
							<h3 className="mb-3">Title</h3>
							<Input type="text" id="title" name="title" placeholder="Write a Title" />
						</div>
						<div>
							<h3 className="mb-3">Description</h3>
							<Textarea id="description" name="description" placeholder="Write a Description" />
						</div>
						<div>
							<h3 className="mb-3">Category</h3>
							<Select name="category">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a Post Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => {
										return (
											<SelectItem key={category.code} value={category.code}>
												{category.name}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>

						<div className="w-full h-full min-h-100 max-h-100">
							<h3 className="mb-3">Content</h3>

							<ReactQuill theme="snow" modules={modules} ref={quillRef} defaultValue={quillInitData} />
						</div>
					</form>
				</section>
			</main>
		);
	}
}
