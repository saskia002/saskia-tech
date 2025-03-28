"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";

export async function softDeletePost(id: number): Promise<void> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const post = await prisma.post.findUnique({
		where: { id: id, isDeleted: false },
	});

	if (!post || post.isDeleted) {
		throw new Error("Post not found or already isDeleted"); // <= these are the same => return Promise.reject(new Error("Not authorized"));
	}

	await prisma.post.update({
		where: { id: id, isDeleted: false },
		data: { isDeleted: true },
	});
}

export async function editPostVisibility(id: number, editPostVisibility: boolean): Promise<void> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const post = await prisma.post.findUnique({
		where: { id: id, isDeleted: false, isPublic: !editPostVisibility },
	});

	if (!post || post.isDeleted) {
		throw new Error("Post not found or already isDeleted"); // <= these are the same => return Promise.reject(new Error("Not authorized"));
	}

	await prisma.post.update({
		where: { id: id, isDeleted: false },
		data: { isPublic: editPostVisibility },
	});
}
