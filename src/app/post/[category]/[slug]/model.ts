export type Post = {
	id: number;
	createdAt: Date;
	slug: string;
	title: string;
	description: string;
	content: string;
	views: number;
	categoryCode: string;
	isPublic: boolean;
};

export type DynamicPathParams = {
	slug: string;
	category: string;
};

export type PageParams = {
	params: Promise<DynamicPathParams>;
};

export type LocationApiSuccessResponse = {
	status: "success";
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	isp: string;
	org: string;
	as: string;
	query: string;
};

export type LocationApiFailResponse = {
	status: "fail";
	message: string;
	query: string;
};
