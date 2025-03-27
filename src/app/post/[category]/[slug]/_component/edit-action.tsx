"use client";

import { Button } from "@/component/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditActionProps = {
	postId: number;
};

export default function EditAction({ postId }: Readonly<EditActionProps>) {
	const router = useRouter();

	const editPost = (): void => {
		router.push(`/admin/post/edit/${postId}`);
	};

	return <Button onClick={editPost}>Edit</Button>;
}
