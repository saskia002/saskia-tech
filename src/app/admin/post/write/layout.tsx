import type { Metadata } from "next";
import { LayoutProps } from "@/model/layout";

export const metadata: Metadata = {
	title: "Write a post",
	description: "Write a new post",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
