"use client";

import type { SlideMediaItem, Slideshow } from "@/app/lib/definitions";
import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";
import { redirect, RedirectType } from "next/navigation";
import { useWindowSize } from "@/app/lib/utils";
import Pagination from "@/app/ui/pagination";
import BackButton from "./back-button";

function MediaItemDisplay({
    mediaItem,
    videoRef,
}: {
    mediaItem: SlideMediaItem;
    videoRef: RefObject<HTMLVideoElement | null>;
}) {
    const windowSize = useWindowSize();
    const url = `${mediaItem.href}?clientWidth=${windowSize.width}&clientHeight=${windowSize.height}`;

    switch (mediaItem.type) {
        case "image":
            return (
                <Image
                    src={url}
                    alt=""
                    height={mediaItem.height}
                    width={mediaItem.width}
                    className="object-scale-down flex-0 shrink max-h-full"
                    priority={true}
                />
            );
        case "video":
            return (
                <video
                    src={url}
                    className="object-scale-down flex-0 shrink max-h-full"
                    autoPlay
                    controls
                    ref={videoRef}
                ></video>
            );
    }
}

export default function SlideDisplay({ slideshow, idx }: { slideshow: Slideshow; idx: number }) {
    const slide = slideshow.slides[idx - 1];
    const mainRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showOverlays, setShowOverlays] = useState<boolean>(false);
    const onTimeout = () => {
        setShowOverlays(false);
    };
    let timeout: NodeJS.Timeout | undefined;

    useEffect(() => {
        mainRef.current?.focus();
        timeout = setTimeout(onTimeout, 2000);
        return () => {
            clearTimeout(timeout);
        };
    });

    if (!slide) return <></>;

    return (
        <main
            ref={mainRef}
            tabIndex={-1}
            onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    redirect(
                        `/slideshow/${slideshow.slug}/${idx < slideshow.slides.length ? idx + 1 : 1}`,
                        RedirectType.push
                    );
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    redirect(
                        `/slideshow/${slideshow.slug}/${idx > 1 ? idx - 1 : slideshow.slides.length}`,
                        RedirectType.push
                    );
                } else if (e.key === " ") {
                    const video = videoRef.current;

                    if (video != null) {
                        e.preventDefault();
                        if (video.paused) video.play();
                        else video.pause();
                    }
                }
            }}
            onMouseMove={(e) => {
                setShowOverlays(true);
                clearTimeout(timeout);
                timeout = setTimeout(onTimeout, 2000);
            }}
        >
            <BackButton href="/" show={showOverlays} />
            <div className="h-screen flex flex-col">
                {slide.title ? (
                    <div className="self-center p-3 text-4xl flex-1 flex items-center">{slide.title}</div>
                ) : null}
                {slide.mediaItems.length > 0 ? (
                    <div className="flex justify-center gap-3 min-h-0 grow basis-auto">
                        {slide.mediaItems.map((mediaItem) => {
                            return <MediaItemDisplay mediaItem={mediaItem} key={mediaItem.id} videoRef={videoRef} />;
                        })}
                    </div>
                ) : null}
            </div>
            <Pagination
                length={slideshow.slides.length}
                currentIdx={idx - 1}
                getHref={(i) => `/slideshow/${slideshow.slug}/${i + 1}`}
                getColorClass={(i) => (slideshow.slides[i].isSpecial ? "text-gray-50" : undefined)}
                show={showOverlays}
                surrounding={5}
            />
        </main>
    );
}
