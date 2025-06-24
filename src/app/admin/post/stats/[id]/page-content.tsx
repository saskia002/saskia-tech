"use client";

import { fixDateFormat } from "@/util/date-util";
import { PostDataAndStats } from "./model";
import { capitalizeFirstLetter } from "@/util/string-util";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/component/ui/table";

type PagecontentProps = {
	postDataAndStats: PostDataAndStats;
};

export default function Pagecontent({ postDataAndStats }: Readonly<PagecontentProps>) {
	const { post, stats } = postDataAndStats;

	return (
		<main className="w-full h-max inline-flex flex-col items-center mb-8">
			<section className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10 gap-3">
				<div className="block w-fit max-w-2xl">
					<h2>Stats for the post</h2>
				</div>
				<div className="block w-fit max-w-2xl">
					<h3>{post.title}</h3>
					<p>{post.description}</p>
					<p className="mt-2!">{`${fixDateFormat(post.createdAt)} EET`}</p>
					{/*<p>{`${fixDateFormat(post.createdAt)} EET`}</p>*/}
					<p className="mt-2!">{`${capitalizeFirstLetter(post.categoryCode)}, ${
						post.views === 0 ? "0 views" : `${post.views} view${post.views > 1 ? "s" : ""}`
					}`}</p>
					<p className="mt-2!">{post.isPublic ? "Public" : "Private"}</p>
				</div>

				<div className="block w-full">
					{stats.length > 0 ? (
						<Table className="table-auto">
							<TableHeader>
								<TableRow>
									<TableHead>Org/Isp</TableHead>
									<TableHead>IP</TableHead>
									<TableHead>Viewed</TableHead>
									<TableHead>Location</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{stats.map((stat, index) => (
									<TableRow key={index + "_" + stat.ip}>
										<TableCell className="whitespace-normal"> {stat.org ? stat.org : stat.isp} </TableCell>
										<TableCell className="whitespace-normal">{stat.ip}</TableCell>
										<TableCell className="whitespace-normal">{fixDateFormat(stat.createdAt)}</TableCell>
										<TableCell className="whitespace-normal">{`${stat.countryCode}, ${stat.lat}, ${stat.lon} - ${stat.country}, ${stat.regionName}, ${stat.city}`}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<p className="pt-3">
							<b>No stats were found.</b>
						</p>
					)}
				</div>
			</section>
		</main>
	);
}
