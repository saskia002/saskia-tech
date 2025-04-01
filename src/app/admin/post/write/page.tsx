import { getServerSession } from "@/lib/auth/server-session";
import { getCategories } from "./action";
import Pagecontent from "./page-content";

export default async function Page() {
	const auth = await getServerSession();
	if (!auth) {
		throw new Error("You must be logged in order to write a post");
	}

	const categories = await getCategories();

	return <Pagecontent categories={categories} />;
}
