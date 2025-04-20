import { isProd } from "@/util/env-util";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const reqHeaders = await headers();
	const domain = reqHeaders.get("host") ?? "";

	if (isProd && domain !== "saskia.tech") {
		redirect("/not-found");
	}

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin/", "/auth/"],
			},
		],
		sitemap: `https://${domain}/sitemap.xml`,
	};
}
