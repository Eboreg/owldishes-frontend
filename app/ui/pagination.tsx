"use client";

import clsx from "clsx";
import Link from "next/link";
import styles from "@/app/ui/pagination.module.css";
import { useState } from "react";

function getPaginationIndices(length: number, currentIdx: number, surrounding: number = 3): number[] {
    let surroundingStart = Math.max(0, currentIdx - surrounding);
    let surroundingEnd = Math.min(length - 1, currentIdx + surrounding);

    if (surroundingStart < surrounding) {
        surroundingStart = 0;
        surroundingEnd = Math.min(length - 1, surrounding * 2 + 2);
    } else if (surroundingEnd >= length - surrounding) {
        surroundingStart = Math.max(0, length - surrounding * 2 - 3);
        surroundingEnd = length - 1;
    }

    return [
        ...Array(surroundingEnd + 1 - surroundingStart)
            .keys()
            .map((i) => i + surroundingStart),
    ];
}

function PaginationItem({
    href,
    text,
    isActive,
    colorClass,
}: {
    href?: string;
    text: string;
    isActive?: boolean;
    colorClass?: string;
}) {
    const classes = clsx(`m-1 h-10 w-10 flex items-center justify-center ${colorClass || "text-gray-400"}`, {
        "border rounded border-gray-600": isActive,
    });

    return isActive || href == undefined ? (
        <div className={classes}>{text}</div>
    ) : (
        <Link href={href} className={classes}>
            {text}
        </Link>
    );
}

export default function Pagination({
    length,
    currentIdx,
    getHref,
    getColorClass,
    surrounding,
    show,
}: {
    length: number;
    currentIdx: number;
    getHref: (idx: number) => string;
    getColorClass: (idx: number) => string | undefined;
    surrounding?: number;
    show: boolean;
}) {
    const indices = getPaginationIndices(length, currentIdx, surrounding);
    const [forceShow, setForceShow] = useState<boolean>(false);

    return (
        <div className={`${styles.container} ${show || forceShow ? "opacity-100" : "opacity-0"}`}>
            <div
                className={styles.content}
                onMouseMove={() => {
                    setForceShow(true);
                }}
                onMouseLeave={() => {
                    setForceShow(false);
                }}
            >
                {indices.includes(1) ? null : (
                    <PaginationItem href={getHref(0)} text="1" key={0} colorClass={getColorClass(0)} />
                )}
                {indices.includes(2) ? null : <PaginationItem text="..." key={1} />}
                {indices.map((slideIdx) => {
                    return (
                        <PaginationItem
                            href={getHref(slideIdx)}
                            text={(slideIdx + 1).toString()}
                            key={slideIdx}
                            isActive={slideIdx == currentIdx}
                            colorClass={getColorClass(slideIdx)}
                        />
                    );
                })}
                {indices.includes(length - 2) ? null : <PaginationItem text="..." key={length - 2} />}
                {indices.includes(length - 1) ? null : (
                    <PaginationItem
                        href={getHref(length - 1)}
                        text={length.toString()}
                        key={length - 1}
                        colorClass={getColorClass(length - 1)}
                    />
                )}
            </div>
        </div>
    );
}
