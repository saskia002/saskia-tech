import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession as next__getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const config = authOptions satisfies NextAuthOptions;

export function getServerSession(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
	return next__getServerSession(...args, config);
}
