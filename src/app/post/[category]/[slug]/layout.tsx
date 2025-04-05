import { LayoutProps } from "@/model/layout";
import { getPost } from "./action";
import { DynamicPathParams, PageParams, Post } from "./model";
import { Metadata } from "next";

export async function generateMetadata({ params }: Readonly<PageParams>): Promise<Metadata> {
	const paramData: DynamicPathParams = await params;
	const data: Post | null = await getPost(paramData.category, paramData.slug);

	if (data) {
		return {
			title: `${data?.title}`,
			description: `${data?.description}`,
			category: `${data?.categoryCode}`,
		};
	}

	return {
		title: "Post Not Found",
		description: "Could not find requested post",
	};
}

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
