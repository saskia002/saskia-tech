import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";

export async function getDevelopmentPosts() {
	const auth = await getServerSession();

	return await prisma.post.findMany({
		where: {
			isDeleted: false,
			categoryCode: "development",
			...(auth ? {} : { isPublic: true }),
		},
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			categoryCode: true,
			slug: true,
			title: true,
			description: true,
			views: true,
			createdAt: true,
			isPublic: true,
		},
	});
}

export async function getLatestPosts() {
	const auth = await getServerSession();

	return await prisma.post.findMany({
		where: {
			isDeleted: false,
			...(auth ? {} : { isPublic: true }),
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 3,
		select: {
			id: true,
			categoryCode: true,
			slug: true,
			title: true,
			description: true,
			views: true,
			createdAt: true,
			isPublic: true,
		},
	});
}

export async function getOtherPosts() {
	const auth = await getServerSession();

	return await prisma.post.findMany({
		where: {
			isDeleted: false,
			categoryCode: {
				not: "development",
			},
			...(auth ? {} : { isPublic: true }),
		},
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			categoryCode: true,
			slug: true,
			title: true,
			description: true,
			views: true,
			createdAt: true,
			isPublic: true,
		},
	});
}
