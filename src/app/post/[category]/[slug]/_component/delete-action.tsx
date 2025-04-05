"use client";

import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useState } from "react";
import { softDeletePost } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";

type DeleteActionProps = {
	postId: number;
};

export default function DeleteAction({ postId }: Readonly<DeleteActionProps>) {
	const [isDeleteActionOpen, setIsDeleteActionOpen] = useState<boolean>(false);
	const router = useRouter();

	const deletePost = (): void => {
		setIsDeleteActionOpen(false);
		softDeletePost(postId)
			.then(() => {
				toast.success("Post is deleted");
				router.push("/");
			})
			.catch((error) => {
				toast.error(`Failed to delete post: ${error}`);
			});
	};

	return (
		<Dialog open={isDeleteActionOpen} onOpenChange={setIsDeleteActionOpen}>
			<SimpleTooltip hint="Delete post" asChild>
				<DialogTrigger asChild>
					<Button variant="ghost">
						<Trash2 />
					</Button>
				</DialogTrigger>
			</SimpleTooltip>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-0!">Delete Post</DialogTitle>
					<DialogDescription>This action cannot be undone. This will permanently delete the post!</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							deletePost();
						}}
					>
						<Button type="submit" variant="destructive">
							Delete
						</Button>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
