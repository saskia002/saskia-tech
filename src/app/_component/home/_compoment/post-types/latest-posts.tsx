import { getLatestPosts } from "./actions";
import BlogCard from "../post-card";
import { Post } from "./model";

function getPostPath(post: Post): string {
	return `/post/${post.categoryCode}/${post.slug}`;
}

export default async function LatestPosts() {
	const LatestPosts: Post[] = await getLatestPosts();

	if (LatestPosts.length === 0) {
		return <p>No posts were found.</p>;
	}

	return (
		<div className="flex flex-row gap-5 flex-wrap">
			{LatestPosts.map((post) => {
				return (
					<BlogCard
						key={post.id}
						title={post.title}
						created={post.createdAt}
						link={getPostPath(post)}
						description={post.description}
						category={post.categoryCode}
						views={post.views}
						isPublic={post.isPublic}
						createdAt={post.createdAt}
					/>
				);
			})}
		</div>
	);
}
