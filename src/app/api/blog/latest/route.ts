import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const letestBlogs = await prisma.post.findMany({
			where: {
				deleted: false,
			},
			orderBy: {
				created: "desc",
			},
			take: 4,
			select: {
				id: true,
				categorySlug: true,
				slug: true,
				title: true,
				desc: true,
				views: true,
				created: true,
			},
		});

		return new NextResponse(JSON.stringify(letestBlogs), { status: 200, headers: { "Content-Type": "application/json" } });
	} catch (error) {
		console.error(`Failed to fetch latest blogs: ${error}`);
		return new NextResponse("Failed to fetch data", { status: 500 });
	}
}
