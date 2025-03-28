"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";
import { Category } from "./model";
import { z } from "zod";

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

const PostSchema = z.object({
	title: z.string().min(1).max(2500).trim(),
	category: z.string().min(1).max(100).trim(),
	description: z.string().min(1).max(1500).trim(),
	content: z.string().min(1).max(Number.MAX_SAFE_INTEGER).trim(),
});

export async function savePost(formData: FormData): Promise<void> {
	const parsedData = PostSchema.safeParse(Object.fromEntries(formData.entries()));

	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	if (parsedData.error) {
		throw new Error(`Failed to parse form data: ${parsedData.error}`);
	}

	if (parsedData.success) {
		const { title, description, category, content } = parsedData.data;

		// TODO: enable this if there are slug collisions
		//const dateString = new Date()
		//	.toLocaleString("en-uk", {
		//		year: "numeric",
		//		month: "2-digit",
		//		day: "2-digit",
		//	})
		//	.replaceAll("/", "-");

		//const slug = `${title.trim().toLowerCase().replace(" ", "-")}-${dateString}`;
		const slug = title.trim().toLowerCase().replace(" ", "-");

		await prisma.post.create({
			data: {
				title: title,
				categoryCode: category,
				description: description,
				content: content,
				slug: slug,
				userEmail: auth.user?.email ?? "",
			},
		});

		return;
	}

	throw new Error("Somethign went wrong");
}
