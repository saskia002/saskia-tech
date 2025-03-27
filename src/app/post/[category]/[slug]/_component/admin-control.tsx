"use client";

import { useSession } from "next-auth/react";
import DeleteAction from "./delete-action";
import EditAction from "./edit-action";

type AdminControlProps = {
	postId: number;
};

export default function AdminControl({ postId }: Readonly<AdminControlProps>) {
	const { status } = useSession();

	if (status === "authenticated") {
		return (
			<div className="mt-3 flex gap-3 justify-end">
				<DeleteAction postId={postId} />
				<EditAction postId={postId} />
			</div>
		);
	}

	return <></>;
}
