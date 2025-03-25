"use client";

import LoadingSpinner from "@/component/ui/custom/loading-spinner";
import { Suspense } from "react";

export default function LoadingProvider({ children }: Readonly<React.ComponentProps<typeof Suspense>>) {
	return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
