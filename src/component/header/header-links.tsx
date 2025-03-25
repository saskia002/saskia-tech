"use client";

import { useSession } from "next-auth/react";
import HeaderNavLink from "./header-nav-link";
import { LogIn, LogOut, Pickaxe } from "lucide-react";

export default function HeaderLinks() {
	const { status } = useSession();

	return (
		<div className="flex gap-4">
			<HeaderNavLink href="/minecraft" tooltip>
				<Pickaxe />
			</HeaderNavLink>
			{status === "authenticated" ? (
				<>
					<HeaderNavLink href="/write">Write a Blog</HeaderNavLink>
					<HeaderNavLink href="/logout" tooltip>
						<LogOut />
					</HeaderNavLink>
				</>
			) : (
				<HeaderNavLink href="/login" tooltip>
					<LogIn />
				</HeaderNavLink>
			)}
		</div>
	);
}
