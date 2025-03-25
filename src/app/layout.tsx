import { ThemeProvider } from "@/component/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/header/header";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "@/component/ui/shadcn/sonner";

// Keyword MAXXING :), it works idk how tho :D
export const metadata: Metadata = {
	title: "Saskia's website",
	description: "Portfolio and a blog about coding, design, and other things I find interesting. Saskia Saskia kriibi Blog Bloggi Portfoolio Portfolio",
	keywords: [
		"Saskia",
		"saskia",
		"Kriibi",
		"Saskia Kriibi",
		"Epic Gamer",
		"IT",
		"Coding",
		"Estonia",
		"Eesti",
		"Banking",
		"Bank",
		"Portfolio",
		"Portfoolio",
		"gloobus",
	],
	authors: [
		{
			url: "https://saskia.tech",
			name: "Saskia Kriibi",
		},
		{
			url: "https://saskia.tech",
			name: "Saskia",
		},
		{
			url: "https://www.linkedin.com/in/saskia-kriibi/",
			name: "Saskia",
		},
		{
			url: "https://www.linkedin.com/in/saskia-kriibi/",
			name: "Saskia Kriibi",
		},

		{
			url: "https://github.com/saskia002",
			name: "Saskia",
		},
		{
			url: "https://github.com/saskia002",
			name: "Saskia Kriibi",
		},
	],
};

type RootLayoutProps = {
	children: React.ReactNode;
	session: Record<string, unknown>;
};

export default function RootLayout({ children, session }: Readonly<RootLayoutProps>) {
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
