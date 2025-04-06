"use client";

import { useSession } from "next-auth/react";
import HeaderNavLink from "./header-nav-link";
import { LogIn, LogOut, Pickaxe } from "lucide-react";

export default function HeaderLinks() {
	const { status } = useSession();

	return (
		<div className="flex gap-4">
			<HeaderNavLink href="/minecraft" tooltip ariaLabel="Minecraft">
				<Pickaxe aria-hidden />
			</HeaderNavLink>
			{status === "authenticated" ? (
				<>
					<HeaderNavLink href="/admin/post/write">Write a Blog</HeaderNavLink>
					<HeaderNavLink href="/auth/logout" tooltip tooltipText="Logout" ariaLabel="Logout">
						<LogOut aria-hidden />
					</HeaderNavLink>
				</>
			) : (
				<HeaderNavLink href="/auth/login" tooltip tooltipText="Login" ariaLabel="Logout">
					<LogIn aria-hidden />
				</HeaderNavLink>
			)}
		</div>
	);
}
