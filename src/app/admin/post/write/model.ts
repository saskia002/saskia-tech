import { DeltaStatic } from "react-quill-new";

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
