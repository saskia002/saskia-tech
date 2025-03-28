"use server";

import { prisma } from "@/lib/prisma";
import { Post } from "./model";
import { getServerSession } from "@/lib/auth/server-session";

export async function getPost(category: string, slug: string): Promise<Post | null> {
	return await prisma.post.findFirst({
		where: {
			isDeleted: false,
			categoryCode: category,
			slug: slug,
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
			isPublic: true,
		},
	});
}

export async function incrementPostViewCount(id: number): Promise<void> {
	const auth = await getServerSession();
	if (!auth) {
		try {
			await prisma.post.update({
				where: { id: id, isDeleted: false, isPublic: true },
				data: {
					views: {
						increment: 1,
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("Failed to update view count");
		}
	}
}
