import { getServerSession } from "@/lib/auth/server-session";
import { getPostinfoAndStats } from "./action";
import Pagecontent from "./page-content";
import { notFound } from "next/navigation";
import { PostDataAndStats } from "./model";

export type DynamicPathParams = {
	id: number;
};

type PageParams = {
	params: Promise<DynamicPathParams>;
};

export default async function Page({ params }: Readonly<PageParams>) {
	const auth = await getServerSession();
	if (!auth) {
		throw new Error("You must be logged in to view stats");
	}

	const paramData: DynamicPathParams = await params;
	const id: number = Number(paramData.id);
	if (isNaN(id) || typeof id !== "number") {
		throw new Error("Invalid id, type is not number");
	}

	const postDataAndStats: PostDataAndStats = await getPostinfoAndStats(id);
	if (!postDataAndStats) {
		notFound();
	}

	return <Pagecontent postDataAndStats={postDataAndStats} />;
}
