"use client";

import { useState, useRef, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/component/ui/button";
import { Textarea } from "@/component/ui/textarea";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill-new";
import { useSession } from "next-auth/react";
import Loading from "./loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { reziseImage } from "@/util/image-util";

export default function Page() {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			toast.success("You must be logged in to write a blog");
			router.push("/");
		},
	});
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);
	const [value, setValue] = useState<any>("");
	const quillRef = useRef<ReactQuill>(null);

	if (status === "loading") {
		return <Loading />;
	}

	if (ReactQuill && typeof typeof window !== "undefined") {
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

		return (
			<main className="w-full h-max inline-flex flex-col items-center gap-8">
				<section className="flex flex-col w-4/6 max-w-[1000px] gap-4">
					<div className="flex w-full justify-end">
						<Button>Post</Button>
					</div>
					<div>
						<h3 className="mb-3">Title:</h3>
						<Textarea placeholder="Type your title here." />
					</div>

					<div className="w-full h-full min-h-100 max-h-100">
						<h3 className="mb-3">Body:</h3>

						<ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} ref={quillRef} />
					</div>
				</section>
			</main>
		);
	}

	return <Loading />;
}
