import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#user-defined-arguments
async function main() {
	try {
		await prisma.category.createMany({
			data: [
				{
					code: "development",
					name: "Development",
				},
				{
					code: "music",
					name: "Music",
				},
				{
					code: "other",
					name: "Other",
				},
			],
		});
	} catch (error) {
		console.log(error);
	}

	try {
		const adminUsername: string | undefined = process.env.ADMIN_USR?.toLowerCase();
		const adminPassword: string | undefined = process.env.ADMIN_PWD;
		const adminName: string | undefined = process.env.ADMIN_NAME;

		if (!adminUsername || !adminPassword || !adminName) {
			throw new Error("Environment variables ADMIN_USR, ADMIN_PWD, and ADMIN_NAME must be set.");
		}

		const hashedPassword = await hash(adminPassword, 10);

		await prisma.user.create({
			data: {
				username: adminUsername,
				password: hashedPassword,
				name: adminName,
			},
		});
	} catch (error) {
		console.log(error);
	}
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
