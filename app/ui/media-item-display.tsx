"use client";

import type { SlideMediaItem } from "@/app/lib/definitions";
import Image from "next/image";
import type { RefObject } from "react";
import { useWindowSize } from "@/app/lib/utils";

export default function MediaItemDisplay({
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
