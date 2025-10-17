import { cache } from "react";
import type { Slide, Slideshow, SlideshowTable } from "@/app/lib/definitions";

export async function fetchSlideshowTable(): Promise<SlideshowTable> {
    const data = await fetch(process.env.NEXT_PUBLIC_API_ROOT!);
    const slideshows = (await data.json()) as SlideshowTable;

    return slideshows;
}

export const fetchSlideshow = cache(async (slug: string) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}${slug}/`);
    const slideshow = (await data.json()) as Slideshow;

    return slideshow;
});

export async function fetchSlide(slug: string, idx: number): Promise<Slide> {
    const slideshow = await fetchSlideshow(slug);

    return slideshow.slides[idx];
}
