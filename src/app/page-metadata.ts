import type { Metadata } from "next";

// Keyword MAXXING :), it works idk how tho :D
export const pageMetadata: Metadata = {
	title: {
		template: "Saskia - %s",
		default: "Saskia - Homepage",
	},
	description: "Saskia Portfolio and a blog about coding, and other things I find interesting.",
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
		"Pank",
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
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};
