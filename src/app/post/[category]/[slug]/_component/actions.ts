"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";

export async function softDeletePost(id: number): Promise<void> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const post = await prisma.post.findUnique({
		where: { id: id, deleted: false },
	});

	if (!post || post.deleted) {
		throw new Error("Post not found or already deleted"); // <= these are the same => return Promise.reject(new Error("Not authorized"));
	}

	await prisma.post.update({
		where: { id: id, deleted: false },
		data: { deleted: true },
	});
}
