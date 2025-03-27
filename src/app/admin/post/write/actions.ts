"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";

type Category = {
	code: string;
	name: string;
};

export async function getCategories(): Promise<Category[]> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const categories = await prisma.category.findMany({
		where: { deleted: false },
		select: { code: true, name: true },
	});

	if (categories.length === 0) {
		throw new Error("Categories not found");
	}

	return categories.map((category) => {
		return {
			code: category.code,
			name: category.name,
		} as Category;
	});
}
