"use server";

import { getServerSession } from "@/lib/auth/server-session";
import { prisma } from "@/lib/prisma";
import { LocationData, Post, PostDataAndStats, ViewData } from "./model";
import { notFound } from "next/navigation";

export async function getPostinfoAndStats(postId: number): Promise<PostDataAndStats> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const postPromise = getPost(postId);
	const statsPromise = getStats(postId);

	const [post, stats] = await Promise.all([postPromise, statsPromise]);

	if (!post) {
		notFound();
	}

	return { post, stats };
}

async function getPost(postId: number): Promise<Post | null> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	return await prisma.post.findFirst({
		where: {
			isDeleted: false,
			id: postId,
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

async function getStats(postId: number): Promise<ViewData[] | undefined> {
	const auth = await getServerSession();

	if (!auth) {
		throw new Error("Not authorized");
	}

	const posts = await prisma.postView.findMany({
		where: {
			isDeleted: false,
			postId: postId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	if (!posts) {
		throw new Error("Post not found");
	}

	return posts
		.map((post) => {
			if (!post.locationInfo) {
				return undefined;
			}
			if (typeof post.locationInfo !== "string") {
				return undefined;
			}

			const locationInfo = JSON.parse(post.locationInfo) as LocationData;
			if (!locationInfo) {
				return undefined;
			}

			return {
				country: locationInfo.country,
				countryCode: locationInfo.countryCode,
				regionName: locationInfo.regionName,
				city: locationInfo.city,
				ip: locationInfo.query,
				createdAt: post.createdAt,
				lat: locationInfo.lat,
				lon: locationInfo.lon,
				isp: locationInfo.isp,
			} as ViewData;
		})
		.filter((viewData): viewData is ViewData => viewData !== undefined);
}
