import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getDevelopmentPosts = unstable_cache(
	async () => {
		return await prisma.post.findMany({
			where: {
				deleted: false,
				categoryCode: "development",
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
			},
		});
	},
	["developmentPosts"],
	{ revalidate: 1, tags: ["developmentPosts"] }
);

export const getLatestPosts = unstable_cache(
	async () => {
		return await prisma.post.findMany({
			where: {
				deleted: false,
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
			},
		});
	},
	["latestPosts"],
	{ revalidate: 1, tags: ["latestPosts"] }
);

export const getOtherPosts = unstable_cache(
	async () => {
		return await prisma.post.findMany({
			where: {
				deleted: false,
				categoryCode: "other",
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
			},
		});
	},
	["otherPosts"],
	{ revalidate: 1, tags: ["otherPosts"] }
);
