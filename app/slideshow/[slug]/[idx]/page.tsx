import { fetchSlideshow } from "@/app/lib/data";
import SlideDisplay from "@/app/ui/slide";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string; idx: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const slideshow = await fetchSlideshow(params.slug);

    return { title: slideshow.title };
}

export default async function Page(props: Props) {
    const params = await props.params;
    const slideshow = await fetchSlideshow(params.slug);

    return <SlideDisplay idx={parseInt(params.idx)} slideshow={slideshow} />;
}
