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
			<div className="mt-3 flex gap-3 justify-between items-center flex-wrap">
				<div className="flex gap-3">
					<DeleteAction postId={postId} />
					<VisibilityAction postId={postId} isPublic={isPublic} />
				</div>
				<div className="flex gap-3">
					<EditAction postId={postId} />
					<StatsAction postId={postId} />
				</div>
			</div>
		);
	}

	return <></>;
}
