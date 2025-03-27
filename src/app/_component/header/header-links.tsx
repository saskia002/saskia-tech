"use client";

import { useSession } from "next-auth/react";
import HeaderNavLink from "./header-nav-link";
import { LogIn, LogOut, Pickaxe } from "lucide-react";

export default function HeaderLinks() {
	const { status } = useSession();

	return (
		<div className="flex gap-4">
			<HeaderNavLink href="/minecraft" tooltipEnabled>
				<Pickaxe />
			</HeaderNavLink>
			{status === "authenticated" ? (
				<>
					<HeaderNavLink href="/admin/post/write">Write a Blog</HeaderNavLink>
					<HeaderNavLink href="/auth/logout" tooltipEnabled tooltipText="Logout">
						<LogOut />
					</HeaderNavLink>
				</>
			) : (
				<HeaderNavLink href="/auth/login" tooltipEnabled tooltipText="Login">
					<LogIn />
				</HeaderNavLink>
			)}
		</div>
	);
}
