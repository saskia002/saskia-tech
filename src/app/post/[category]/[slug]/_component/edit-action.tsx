"use client";

import { Button } from "@/component/ui/button";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";

type EditActionProps = {
	postId: number;
};

export default function EditAction({ postId }: Readonly<EditActionProps>) {
	const router = useRouter();

	const editPost = (): void => {
		router.push(`/admin/post/edit/${postId}`);
	};

	return (
		<SimpleTooltip hint="Edit post" asChild>
			<Button onClick={editPost} variant="outline" aria-label="Edit post">
				<NotebookPen aria-hidden />
			</Button>
		</SimpleTooltip>
	);
}
