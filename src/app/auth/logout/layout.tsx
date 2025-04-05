import type { Metadata } from "next";
import { LayoutProps } from "@/model/layout";

export const metadata: Metadata = {
	title: "Logout",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
