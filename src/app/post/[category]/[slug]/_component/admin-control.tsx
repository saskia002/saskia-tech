"use client";

import { useSession } from "next-auth/react";
import DeleteAction from "./delete-action";
import EditAction from "./edit-action";
import VisibilityAction from "./visibility-action";
import StatsAction from "./stats-action";

type AdminControlProps = {
	postId: number;
	isPublic: boolean;
};

export default function AdminControl({ postId, isPublic }: Readonly<AdminControlProps>) {
	const { status } = useSession();

	if (status === "authenticated") {
		return (
			<div className="mt-3 flex gap-3 justify-end">
				<DeleteAction postId={postId} />
				<VisibilityAction postId={postId} isPublic={isPublic} />
				<EditAction postId={postId} />
				<StatsAction postId={postId} />
			</div>
		);
	}

	return <></>;
}
