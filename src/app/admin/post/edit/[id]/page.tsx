import { getServerSession } from "@/lib/auth/server-session";
import { getCategories, getPost } from "./action";
import Pagecontent from "./page-content";
import { notFound } from "next/navigation";
import { Category, Post } from "./model";

export type DynamicPathParams = {
	id: number;
};

type PageParams = {
	params: Promise<DynamicPathParams>;
};

export default async function Page({ params }: Readonly<PageParams>) {
	const auth = await getServerSession();
	if (!auth) {
		throw new Error("You must be logged in order to edit a post");
	}

	const paramData: DynamicPathParams = await params;
	const id: number = Number(paramData.id);
	if (isNaN(id) || typeof id !== "number") {
		throw new Error("Invalid id, type is not number");
	}

	const post: Post | null = await getPost(id);
	if (!post) {
		notFound();
	}

	const categories: Category[] = await getCategories();

	return <Pagecontent post={post} categories={categories} />;
}
