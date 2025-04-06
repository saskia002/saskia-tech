import { Button } from "@/component/ui/button";
import { Github } from "lucide-react";
import SimpleTooltip from "@/component/ui/custom/simple-tooltip";
import HomePosts from "@/app/_component/home/home-posts";

export default function Home() {
	return (
		<main className="w-full h-max inline-flex flex-col items-center gap-8 mb-8">
			<section className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10">
				<h2>Info</h2>

				<p>Hello! My name is Saskia Kriibi. I work as a software engineer.</p>
				<p>My goal is to write a new dev blog every Friday about what I've learnt during the week.</p>

				<div className="mt-3">
					<p>
						This site was written using Next.js, Tailwind CSS, Shadcn, Prisma and{" "}
						<SimpleTooltip hint="Pronounced postgres squiil" className="cursor-help">
							PostgreSQL
						</SimpleTooltip>
						.
					</p>
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
			<section className="min-md:w-4/6 max-w-[1000px] max-md:w-8/10">
				<h2 className="mb-5" tabIndex={-1}>
					Posts
				</h2>
				<HomePosts />
			</section>
		</main>
	);
}
