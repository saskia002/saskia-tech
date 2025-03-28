import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { Suspense } from "react";
import LatestPosts from "./_compoment/post-types/latest-posts";
import MainLoadingSpinner from "@/component/ui/custom/main-loading-spinner";
import DevelopmentPosts from "./_compoment/post-types/development-posts";
import { capitalizeFirstLetter } from "@/util/string-util";
import OtherPosts from "./_compoment/post-types/other-posts";
import LoadingSpinner from "@/component/ui/custom/loading-spinner";

const ListTiggers = [
	{ name: "latest", component: <LatestPosts /> },
	{ name: "development", component: <DevelopmentPosts /> },
	{ name: "other", component: <OtherPosts /> },
] as const;

function TabElements() {
	return (
		<>
			{ListTiggers.map((type) => (
				<TabsTrigger key={"trig_" + type.name} value={type.name}>
					{capitalizeFirstLetter(type.name)}
				</TabsTrigger>
			))}
		</>
	);
}

function TabViewsElements() {
	return (
		<>
			{ListTiggers.map((type) => (
				<TabsContent key={"content_" + type.name} value={type.name} className="mt-3">
					{type.component}
				</TabsContent>
			))}
		</>
	);
}

export default async function HomePosts() {
	return (
		<div className="max-w-2xl">
			<Tabs defaultValue="latest">
				<div className="max-xs:hidden">
					<TabsList className="flex w-full max-w-2xl">
						<TabElements />
					</TabsList>
				</div>
				<div className="min-xs:hidden">
					<TabsList className="flex flex-col w-full h-full *:w-full">
						<TabElements />
					</TabsList>
				</div>
				<Suspense fallback={<LoadingSpinner />}>
					<TabViewsElements />
				</Suspense>
			</Tabs>
		</div>
	);
}
