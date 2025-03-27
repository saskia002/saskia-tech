"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";

type AuthProviderProps = {
	children: ReactNode;
	session?: Session | null;
};

export default function AuthProvider({ session, children }: Readonly<AuthProviderProps>) {
	return (
		<SessionProvider refetchInterval={5 * 60} session={session}>
			{children}
		</SessionProvider>
	);
}
