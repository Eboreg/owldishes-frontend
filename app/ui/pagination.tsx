"use client";

import clsx from "clsx";
import Link from "next/link";
import styles from "@/app/ui/pagination.module.css";
import React, { useState, useEffect, useRef } from "react";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { isMouseOver, useMousePosition } from "@/app/contexts/mouse-position-context";
import type { Rect } from "@/app/lib/definitions";

function PaginationItem({
    children,
    href,
    disabled = false,
}: {
    href: string;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    const classes = clsx("m-1 h-10 w-10 flex items-center justify-center", disabled ? "text-gray-400" : "text-gray-50");

    return disabled ? (
        <div className={classes}>{children}</div>
    ) : (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}

export default function Pagination({
    length,
    currentIdx,
    getHref,
    show,
}: {
    length: number;
    currentIdx: number;
    getHref: (idx: number) => string;
    show: boolean;
}) {
    const [forceShow, setForceShow] = useState<boolean>(false);
    const { mousePosition } = useMousePosition();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rect: Rect = {
            left: ref.current!.offsetLeft,
            top: ref.current!.parentElement!.offsetTop,
            height: ref.current!.offsetHeight,
            width: ref.current!.offsetWidth,
        };

        if (isMouseOver(rect, mousePosition)) setForceShow(true);
    }, [
        ref.current?.offsetLeft,
        ref.current?.parentElement?.offsetTop,
        ref.current?.offsetHeight,
        ref.current?.offsetWidth,
        mousePosition,
    ]);

    return (
        <div className={`${styles.container} ${show || forceShow ? "opacity-100" : "opacity-0"}`}>
            <div
                ref={ref}
                className={styles.content}
                onMouseMove={() => {
                    setForceShow(true);
                }}
                onMouseLeave={() => {
                    setForceShow(false);
                }}
            >
                <PaginationItem href={getHref(0)} disabled={currentIdx == 0}>
                    <ChevronDoubleLeftIcon className="w-6" />
                </PaginationItem>
                <PaginationItem href={getHref(currentIdx - 1)} disabled={currentIdx == 0}>
                    <ChevronLeftIcon className="w-6" />
                </PaginationItem>
                <div className="m-1 h-10 flex items-center justify-center text-lg">
                    {currentIdx + 1} / {length}
                </div>
                <PaginationItem href={getHref(currentIdx + 1)} disabled={currentIdx == length - 1}>
                    <ChevronRightIcon className="w-6" />
                </PaginationItem>
                <PaginationItem href={getHref(length - 1)} disabled={currentIdx == length - 1}>
                    <ChevronDoubleRightIcon className="w-6" />
                </PaginationItem>
            </div>
        </div>
    );
}
