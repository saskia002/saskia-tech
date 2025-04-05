"use client";

import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useState } from "react";
import { editPostVisibility } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookKey, BookLock } from "lucide-react";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";

type VisibilityActionProps = {
	postId: number;
	isPublic: boolean;
};

export default function VisibilityAction({ postId, isPublic }: Readonly<VisibilityActionProps>) {
	const [isVisibilityActionOpen, setIsVisibilityActionOpen] = useState<boolean>(false);
	const router = useRouter();

	const editPost = (visibility: boolean): void => {
		setIsVisibilityActionOpen(false);
		editPostVisibility(postId, visibility)
			.then(() => {
				toast.success(`Updated posts visibility to ${visibility ? "public" : "private"}`);
				router.refresh();
			})
			.catch((error) => {
				toast.error(`Failed to publish post: ${error}`);
			});
	};

	return (
		<Dialog open={isVisibilityActionOpen} onOpenChange={setIsVisibilityActionOpen}>
			<SimpleTooltip hint={isPublic ? "Unpublish post" : "Publish post"} asChild>
				<DialogTrigger asChild>
					<Button variant="ghost">{isPublic ? <BookLock /> : <BookKey />}</Button>
				</DialogTrigger>
			</SimpleTooltip>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="mb-0!">{isPublic ? "Unpublish" : "Publish"} Post</DialogTitle>
					<DialogDescription>Are you sure that you want to change posts visibility?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editPost(!isPublic);
						}}
					>
						<Button type="submit" variant="destructive">
							{isPublic ? "Unpublish" : "Publish"}
						</Button>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
