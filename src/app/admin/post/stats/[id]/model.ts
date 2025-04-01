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

export type PostView = {
	createdAt: Date;
	updatedAt: Date;
	isDeleted: boolean;
	id: number;
	postId: number;
	ipv6: string;
	locationInfo: LocationData;
};

export type LocationData = {
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

export type ViewData = {
	ip: string;
	createdAt: Date;
	country: string;
	countryCode: string;
	regionName: string;
	city: string;
	lat: number;
	lon: number;
	timezone: string;
	isp: string;
};

export type PostDataAndStats = {
	post: Post;
	stats: ViewData[];
};
