import type { Metadata } from "next";
import { LayoutProps } from "@/app/model/layout";

export const metadata: Metadata = {
	title: "Write a Blog",
	description: "Write a New Blog",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
