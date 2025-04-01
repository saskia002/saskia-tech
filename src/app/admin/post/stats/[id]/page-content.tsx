"use client";

import { fixDateFormat } from "@/util/date-util";
import { PostDataAndStats } from "./model";
import { capitalizeFirstLetter } from "@/util/string-util";
import { Separator } from "@/component/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/component/ui/table";

type PagecontentProps = {
	postDataAndStats: PostDataAndStats;
};

export default function Pagecontent({ postDataAndStats }: Readonly<PagecontentProps>) {
	const { post, stats } = postDataAndStats;

	return (
		<main className="w-full h-max inline-flex flex-col items-center">
			<section className="min-sm:w-4/6 max-w-[1000px] max-sm:w-8/10 flex flex-col gap-6">
				<div className="block w-fit max-w-2xl">
					<h2>Stats for the post</h2>
				</div>
				<div className="block w-fit max-w-2xl">
					<h3>{post.title}</h3>
					<p>{post.description}</p>
					<p className="mt-1!">{`${fixDateFormat(post.createdAt)} EET`}</p>
					{/*<p>{`${fixDateFormat(post.createdAt)} EET`}</p>*/}
					<p className="mt-1!">{`${capitalizeFirstLetter(post.categoryCode)}, ${
						post.views === 0 ? "0 views" : `${post.views} view${post.views > 1 ? "s" : ""}`
					}`}</p>
					<p className="mt-1!">{post.isPublic ? "Public" : "Private"}</p>
				</div>

				<div className="block w-full max-w-2xl">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Location</TableHead>
								<TableHead>Coordinates</TableHead>
								<TableHead>IP</TableHead>
								<TableHead>Viewed</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{stats.map((stat) => (
								<TableRow key={stat.ip}>
									<TableCell>{`${stat.countryCode} - ${stat.country}, ${stat.regionName}, ${stat.city}`}</TableCell>
									<TableCell>{`${stat.lat}, ${stat.lon}`}</TableCell>
									<TableCell>{stat.ip}</TableCell>
									<TableCell>{fixDateFormat(stat.createdAt)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>
		</main>
	);
}
