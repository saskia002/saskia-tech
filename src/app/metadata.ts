import type { Metadata } from "next";

// Keyword MAXXING :), it works idk how tho :D
export const pageMetadata: Metadata = {
	title: {
		template: "Saskia - %s",
		default: "Saskia - Homepage",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "Saskia - Homepage",
		description: "Saskia's homepage. I post about coding, IT and other things I find interesting.",
		url: "https://saskia.tech",
		type: "website",
		siteName: "Saskia",
		images: [
			{
				url: "https://saskia.tech/og-image.jpg",
				width: 256,
				height: 256,
				alt: "Saskia - Homepage",
			},
		],
	},
	description: "Saskia's homepage. I post about coding, IT and other things I find interesting.",
	keywords: [
		"Saskia",
		"saskia",
		"Kriibi",
		"Saskia Kriibi",
		"IT",
		"Dev",
		"Development",
		"Code",
		"Coding",
		"Estonia",
		"Eesti",
		"Portfolio",
		"Portfoolio",
		"Blog",
		"Blogi",
		"Post",
		"Postitus",
		"saskia tech",
		"saskia002",
	],
	authors: [
		{
			name: "Saskia",
		},
		{
			name: "Saskia Kriibi",
		},
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
			name: "saskia002",
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
