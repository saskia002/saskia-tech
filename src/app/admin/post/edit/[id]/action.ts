"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";
import { Category, Post } from "./model";
import { z } from "zod";
import { removeEmojis } from "@/util/string-util";

export async function getPost(id: number): Promise<Post | null> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	return await prisma.post.findFirst({
		where: {
			isDeleted: false,
			id: id,
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

export async function getCategories(): Promise<Category[]> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const categories = await prisma.category.findMany({
		where: { isDeleted: false },
		select: { code: true, name: true },
	});

	if (categories.length === 0) {
		throw new Error("Categories not found");
	}

	return categories;
}

export async function updatePost(id: number, formData: FormData): Promise<Post> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const PostSchema = z.object({
		title: z.string().min(1).max(2500).trim(),
		category: z.string().min(0).max(100).trim(),
		description: z.string().min(1).max(1500).trim(),
		content: z.string().min(1).max(Number.MAX_SAFE_INTEGER).trim(),
	});
	const parsedData = PostSchema.safeParse(Object.fromEntries(formData.entries()));

	if (parsedData.error) {
		throw new Error(`Failed to parse form data: ${parsedData.error}`);
	}

	if (parsedData.success) {
		const { title, description, category, content } = parsedData.data;

		const slug = encodeURIComponent(removeEmojis(title).trim().toLowerCase().replaceAll(" ", "-").replace(/-$/, ""));

		const data = await prisma.post.update({
			where: {
				id: id,
			},
			data: {
				title: title,
				description: description,
				content: content,
				slug: slug,
				...(category ? { categoryCode: category } : {}),
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

		return data;
	}

	throw new Error("Something went wrong");
}
