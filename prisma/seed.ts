import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#user-defined-arguments
async function main() {
	//	 id    String  @id @default(cuid()) @map("_id")
	//  slug  String  @unique
	//  title String
	//  img   String?
	//  Posts Post[]
	await prisma.category.createMany({
		data: [
			{
				slug: "coding",
				title: "Coding",
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
