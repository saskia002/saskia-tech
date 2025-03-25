import { H2, P } from "@/component/ui/custom/typography";
import HomeBlogs from "@/component/blog/home/home-blogs";
import { Button } from "@/component/ui/shadcn/button";
import { Github } from "lucide-react";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";

export default function Home() {
	return (
		<main className="w-full h-100 inline-flex flex-col items-center gap-8">
			<section className="w-4/6 max-w-[1000px]">
				<H2>Info</H2>

				<P>Hello! My name is Saskia kriibi. I work as a software engineer.</P>
				<P>My goal is to write a new dev blog every Friday about what I've learnt during the week.</P>

				<div className="mt-3">
					<P>
						This site was written using Next.js, Tailwind CSS, Shadcn, Prisma and{" "}
						<SimpleTooltip hint={"Pronounced postgres squiil"}>PostgreSQL</SimpleTooltip>.
					</P>
					<div className="mt-3">
						<div className="inline-flex">
							<Button variant="ghost" className="w-full text-wrap whitespace-break-spaces h-max flex flex-row" asChild>
								<a href="https://github.com/saskia002/saskia-tech" target="_blank">
									<Github /> The code for this website can be found on here
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="w-4/6 max-w-[1000px]">
				<H2 className="mb-5" tabIndex={-1}>
					Blogs
				</H2>
				<HomeBlogs />
			</section>
		</main>
	);
}
