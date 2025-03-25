"use client";

import { useState, JSX, useRef, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import { H3 } from "@/component/ui/custom/typography";
import { Button } from "@/component/ui/shadcn/button";
import { Textarea } from "@/component/ui/shadcn/textarea";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill-new";

export default function Page(): JSX.Element {
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);

	const [value, setValue] = useState<any>("");
	const quillRef = useRef<ReactQuill>(null);

	if (ReactQuill && typeof typeof window !== "undefined") {
		const imageHandler = () => {
			if (!window?.document) return;

			const input = window?.document?.createElement("input");
			input.setAttribute("type", "file");
			input.setAttribute("accept", "image/*");
			input.click();

			input.onchange = async () => {
				const file = input.files?.[0];
				console.log(file);
				if (!file) return;

				// Simulate image upload (Replace with actual server upload)
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const range = quillRef.current?.getEditor().getSelection();
					if (range) {
						quillRef.current?.getEditor().insertEmbed(range.index, "image", reader.result);
					}
				};
			};
		};

		const modules = {
			//syntax: true, // Enable syntax highlighting
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
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
			<main className="w-full h-100 inline-flex flex-col items-center gap-8">
				<section className="flex flex-col w-full max-w-3/4 gap-4">
					<div className="flex w-full justify-end">
						<Button>Post</Button>
					</div>
					<div>
						<H3 className="mb-3">Title:</H3>
						<Textarea placeholder="Type your title here." />
					</div>

					<div className="w-full h-full min-h-100 max-h-100">
						<H3 className="mb-3">Body:</H3>

						<ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} ref={quillRef} />
					</div>
				</section>
			</main>
		);
	}

	return <div>Loading...</div>;
}
