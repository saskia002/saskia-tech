import type { Metadata } from "next";
import { LayoutProps } from "@/app/model/layout";

export const metadata: Metadata = {
	title: "Minecraft",
	description: "My Minecraft Server",
};

export default async function layout({ children }: Readonly<LayoutProps>) {
	return children;
}
