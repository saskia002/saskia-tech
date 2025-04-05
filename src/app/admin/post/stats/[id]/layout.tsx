import type { Metadata } from "next";
import { LayoutProps } from "@/model/layout";

export const metadata: Metadata = {
	title: "View post stats",
	description: "View post stats",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
