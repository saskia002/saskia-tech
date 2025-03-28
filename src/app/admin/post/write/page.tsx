import { getCategories } from "./action";
import Pagecontent from "./page-content";

export default async function Page() {
	const categories = await getCategories();

	return <Pagecontent categories={categories} />;
}
