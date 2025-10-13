import Link from "next/link";
import { fetchSlideshowTable } from "./lib/data";
import styles from "@/app/ui/home.module.css";

export default async function Home() {
    const slideshows = await fetchSlideshowTable();

    return (
        <main>
            <div className="p-6 md:p-12">
                <h1 className="mb-4 text-xl md:text-2xl">Owl Dishes</h1>
                <div className="flex flex-wrap flex-row">
                    {slideshows.map((slideshow) => {
                        return (
                            <Link href={`/slideshow/${slideshow.slug}/1`} key={slideshow.slug}>
                                <div className={styles.cover}>
                                    <img src={slideshow.cover} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>{slideshow.title}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
