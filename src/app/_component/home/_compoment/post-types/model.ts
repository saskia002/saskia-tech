export type Post = {
	id: number;
	createdAt: Date;
	slug: string;
	title: string;
	description: string;
	views: number;
	categoryCode: string;
	isPublic: boolean;
};
