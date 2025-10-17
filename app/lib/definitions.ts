export type MousePosition = { x: number; y: number };

export type MousePositionContextType = {
    mousePosition?: MousePosition;
    setMousePosition: (value: MousePosition) => void;
};

export type Rect = { left: number; top: number; width: number; height: number };

export type Slide = {
    mediaItems: SlideMediaItem[];
    title?: string;
    paginationColor?: string;
    isSpecial?: boolean;
};

export type SlideMediaItem = {
    href: string;
    height: number;
    id: number;
    width: number;
    type: "image" | "video";
};

export type Slideshow = {
    title: string;
    slug: string;
    slides: Slide[];
    cover?: string;
};

export type SlideshowTable = Omit<Slideshow, "slides">[];

export type WindowSize = { width?: number; height?: number };
