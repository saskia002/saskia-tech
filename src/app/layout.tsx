import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_component/header/header";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "@/component/ui/sonner";
import { pageMetadata } from "@/app/page-metadata";
import { getServerSession } from "@/lib/auth/server-session";
import { LayoutProps } from "@/app/model/layout";

export const metadata: Metadata = pageMetadata;

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
	"use server";
	const session = await getServerSession();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<AuthProvider session={session}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Header />
						{children}
						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
