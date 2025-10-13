export type SlideMediaItem = {
    href: string;
    height: number;
    id: number;
    width: number;
    type: "image" | "video";
};

export type Slide = {
    mediaItems: SlideMediaItem[];
    title?: string;
    paginationColor?: string;
    isSpecial?: boolean;
};

export type Slideshow = {
    title: string;
    slug: string;
    slides: Slide[];
    cover?: string;
};

export type SlideshowTable = Omit<Slideshow, "slides">[];
