export type PostData = {
	id: number;
	createdAt: Date;
	slug: string;
	title: string;
	description: string;
	content: string;
	views: number;
	categoryCode: string;
};

export type DynamicPathParams = {
	slug: string;
	category: string;
};

export type PageParams = {
	params: Promise<DynamicPathParams>;
};
