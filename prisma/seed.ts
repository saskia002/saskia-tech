import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#user-defined-arguments
async function main() {
	//await prisma.category.createMany({
	//	data: [
	//		{
	//			code: "development",
	//			name: "Development",
	//		},
	//	],
	//});

	//await prisma.user.create({
	//	data: {
	//		email: "dummyuser@example.com",
	//		name: "Dummy User",
	//	},
	//});

	//await prisma.post.createMany({
	//	data: [
	//		{
	//			slug: "post-1",
	//			title: "Understanding Prisma ORM",
	//			description: "An introductory guide to using Prisma ORM in Node.js",
	//			content: "Prisma is an ORM that helps you work with databases more easily.",

	//			categoryCode: "development", // This references the existing category 'Development'
	//			userEmail: "dummyuser@example.com", // Assuming the user email exists
	//			views: 100,
	//			deleted: false,
	//		},
	//		{
	//			slug: "post-2",
	//			title: "React Basics: A Beginner's Guide",
	//			description: "Learn the basics of React and start building your own web applications",
	//			content: "React is a powerful JavaScript library for building user interfaces.",

	//			categoryCode: "development",
	//			userEmail: "dummyuser@example.com",
	//			views: 200,
	//			deleted: false,
	//		},
	//		{
	//			slug: "post-3",
	//			title: "Node.js for Backend Development",
	//			description: "A comprehensive guide to using Node.js for backend development",
	//			content: "Node.js allows you to build scalable applications with JavaScript on the server-side.",

	//			categoryCode: "development",
	//			userEmail: "dummyuser@example.com",
	//			views: 300,
	//			deleted: false,
	//		},
	//	],
	//});

	await prisma.post.createMany({
		data: [
			{
				slug: "post-6",
				title: "Not Understanding Prisma 2",
				description: "An introductory guide to using Prisma ORM in Node.js",
				content: "<h1>Prisma is an ORM that helps you work with databases more easily.</h1> <p>text</p> <h2>text</h2>",

				categoryCode: "development",
				userEmail: "dummyuser@example.com",
				views: 0,
				deleted: false,
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
