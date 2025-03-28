import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "admin" },
				password: { label: "Password", type: "password", placeholder: "admin" },
			},
			async authorize(credentials, req) {
				const reqUsername = credentials?.username.toLowerCase();
				const reqPassword = credentials?.password;

				if (!credentials?.password || !credentials.username) {
					throw new Error("Missing credentials");
				}

				if (reqUsername !== process.env.ADMIN_USR) {
					throw new Error("Incorrect credentials");
				}

				const dbUser = await prisma.user.findFirstOrThrow({
					where: {
						username: reqUsername,
					},
					select: {
						username: true,
						password: true,
					},
				});

				if (reqUsername === dbUser.username) {
					const isPasswordCorrect = await compare(reqPassword ?? "", dbUser.password);
					if (isPasswordCorrect) {
						return {
							id: dbUser.username,
							email: dbUser.username,
							name: dbUser.username,
						};
					}
				}

				// If you return null then an error will be displayed advising the user to check their details.
				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				//return null;
				throw new Error("Incorrect credentials");
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		error: "/_error",
		newUser: "/_error",
		signIn: "/auth/login",
		signOut: "/auth/logout",
	},
};
