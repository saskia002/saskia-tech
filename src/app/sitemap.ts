"use server";

import { prisma } from "@/lib/prisma";
import { isProd } from "@/util/env-util";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type BaseSitemapData = {
	path: string;
	lastModified: string;
	changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | undefined;
	priority: number;
};

type SitemapPost = {
	categoryCode: string;
	slug: string;
	updatedAt: Date;
};

function getPostPath(post: SitemapPost): string {
	return `/post/${post.categoryCode}/${post.slug}`;
}

async function getPostSitemapData(): Promise<BaseSitemapData[]> {
	const posts: SitemapPost[] = await prisma.post.findMany({
		where: {
			isDeleted: false,
			isPublic: true,
		},
		orderBy: {
			updatedAt: "desc",
		},
		select: {
			categoryCode: true,
			slug: true,
			updatedAt: true,
		},
	});

	return posts.map((post) => {
		return {
			path: getPostPath(post),
			lastModified: new Date(post.updatedAt).toISOString(),
			changeFrequency: "weekly",
			priority: 0.7,
		};
	});
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const reqHeaders = await headers();
	const host = reqHeaders.get("host") ?? "";
	const domain = host.replace(/^www\./, "");

	if (isProd) {
		const allowedDomains: string[] = ["saskia.tech", "saskia002.ee"];

		if (!allowedDomains.includes(domain)) {
			redirect("/not-found");
		}
	}

	try {
		const postPages: BaseSitemapData[] = await getPostSitemapData();
		const staticPages: BaseSitemapData[] = [
			{
				path: "/",
				lastModified: new Date().toISOString(),
				changeFrequency: "weekly",
				priority: 1,
			},
			{
				path: "/minecraft",
				lastModified: new Date("2025-04-01").toISOString(),
				changeFrequency: "monthly",
				priority: 0.1,
			},
		];

		const allPages: BaseSitemapData[] = [...staticPages, ...postPages];

		return allPages.map((page) => {
			return {
				url: `https://${domain}${page.path}`,
				lastModified: page.lastModified,
				changeFrequency: page.changeFrequency,
				priority: page.priority,
			};
		});
	} catch (error) {
		console.error(error);
		redirect("/not-found");
	}
}
