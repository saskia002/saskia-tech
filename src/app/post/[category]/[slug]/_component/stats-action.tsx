"use client";

import { Button } from "@/component/ui/button";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

type StatsActionProps = {
	postId: number;
};

export default function StatsAction({ postId }: Readonly<StatsActionProps>) {
	const router = useRouter();

	const viewPostStats = (): void => {
		router.push(`/admin/post/stats/${postId}`);
	};

	return (
		<SimpleTooltip hint="View post stats" asChild>
			<Button onClick={viewPostStats}>
				<TrendingUp />
			</Button>
		</SimpleTooltip>
	);
}
