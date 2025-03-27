import type { Metadata } from "next";
import { LayoutProps } from "@/app/model/layout";

export const metadata: Metadata = {
	title: "Logout",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
