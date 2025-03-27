"use server";

import { prisma } from "@/lib/prisma";
import { DynamicPathParams, PostData } from "./model";

export async function getPost(pathParams: DynamicPathParams): Promise<PostData | null> {
	return await prisma.post.findFirst({
		where: {
			deleted: false,
			categoryCode: pathParams.category,
			slug: pathParams.slug,
		},
		select: {
			id: true,
			categoryCode: true,
			slug: true,
			title: true,
			description: true,
			views: true,
			createdAt: true,
			content: true,
		},
	});
}

export async function incrementPostViewCount(id: number): Promise<void> {
	await prisma.post.update({
		where: { id: id, deleted: false },
		data: {
			views: {
				increment: 1,
			},
		},
	});
}
