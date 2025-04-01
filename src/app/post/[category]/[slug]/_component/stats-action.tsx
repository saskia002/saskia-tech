"use client";

import { Button } from "@/component/ui/button";
import { useRouter } from "next/navigation";

type StatsActionProps = {
	postId: number;
};

export default function StatsAction({ postId }: Readonly<StatsActionProps>) {
	const router = useRouter();

	const viewPostStats = (): void => {
		router.push(`/admin/post/stats/${postId}`);
	};

	return <Button onClick={viewPostStats}>View stats</Button>;
}
