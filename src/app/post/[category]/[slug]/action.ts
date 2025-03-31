"use server";

import { prisma } from "@/lib/prisma";
import { LocationApiFailResponse, LocationApiSuccessResponse, Post } from "./model";
import { getServerSession } from "@/lib/auth/server-session";
import { headers } from "next/headers";
import { convertIptoIpv6, isLocalIp } from "@/util/ip-util";

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

export async function incrementPostViewCount(postId: number): Promise<void> {
	const auth = await getServerSession();
	if (!auth) {
		try {
			const reqHeaders = await headers();

			if (!reqHeaders) {
				throw new Error("Request headers not found");
			}

			const userIp: string | undefined = reqHeaders.get("X-Real-IP") ?? reqHeaders.get("X-Forwarded-For")?.split(",")[0];

			if (!userIp) {
				throw new Error("User ip not found");
			}

			const userIpv6 = convertIptoIpv6(userIp);

			const hasUserViewedPost = await prisma.postView.findFirst({
				where: {
					postId: postId,
					ipv6: userIpv6,
				},
			});

			if (!hasUserViewedPost) {
				let locationData: LocationApiFailResponse | LocationApiSuccessResponse | undefined = undefined;

				if (!isLocalIp(userIpv6)) {
					const locationCheckUrl = `http://ip-api.com/json/${encodeURIComponent(userIpv6)}`;
					const locationCheckResp = await fetch(locationCheckUrl);
					if (!locationCheckResp) {
						throw new Error("IP external lookup failed");
					}
					locationData = await locationCheckResp.json();

					if (locationData && locationData.status === "fail") {
						throw new Error("IP external lookup failed");
					}
				}

				await prisma.postView.create({
					data: {
						postId: postId,
						ipv6: userIpv6,
						locationInfo: locationData ?? {},
					},
				});

				await prisma.post.update({
					where: { id: postId, isDeleted: false, isPublic: true },
					data: {
						views: {
							increment: 1,
						},
					},
				});
			}
		} catch (error) {
			throw new Error(`Failed to update view count. ${error}`);
		}
	}
}
