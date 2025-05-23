import BlogCard from "../post-card";
import { getOtherPosts } from "./actions";
import { Post } from "./model";

function getPostPath(post: Post): string {
	return `/post/${post.categoryCode}/${post.slug}`;
}

export default async function OtherPosts() {
	const otherPosts: Post[] = await getOtherPosts();

	if (otherPosts.length === 0) {
		return <p>No posts were found.</p>;
	}

	return (
		<div className="flex flex-row gap-5 flex-wrap">
			{otherPosts.map((post) => {
				return (
					<BlogCard
						key={post.id}
						title={post.title}
						created={post.createdAt}
						link={getPostPath(post)}
						description={post.description}
						views={post.views}
						isPublic={post.isPublic}
						createdAt={post.createdAt}
					/>
				);
			})}
		</div>
	);
}
