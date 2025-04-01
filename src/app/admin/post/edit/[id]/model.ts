import { DeltaStatic } from "react-quill-new";

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

export type Category = {
	code: string;
	name: string;
};

export type LocalStoragePostData = {
	title: string;
	description: string;
	category: string;
	content?: DeltaStatic;
};
