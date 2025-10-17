import { ArrowTurnUpLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/back-button.module.css";
import { useEffect, useRef, useState } from "react";
import { isMouseOver, useMousePosition } from "@/app/contexts/mouse-position-context";
import type { Rect } from "@/app/lib/definitions";

export default function BackButton({ href, show }: { href: string; show: boolean }) {
    const [forceShow, setForceShow] = useState<boolean>(false);
    const { mousePosition } = useMousePosition();
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const rect: Rect = {
            left: ref.current!.offsetLeft,
            top: ref.current!.offsetTop,
            height: ref.current!.offsetHeight,
            width: ref.current!.offsetWidth,
        };

        if (isMouseOver(rect, mousePosition)) setForceShow(true);
    }, [
        ref.current?.offsetLeft,
        ref.current?.offsetTop,
        ref.current?.offsetHeight,
        ref.current?.offsetWidth,
        mousePosition,
    ]);

    return (
        <Link
            ref={ref}
            href={href}
            className={`${styles.container} rounded-full p-3 m-2 ${show || forceShow ? "opacity-100" : "opacity-0"}`}
            onMouseMove={() => {
                setForceShow(true);
            }}
            onMouseLeave={() => {
                setForceShow(false);
            }}
        >
            <ArrowTurnUpLeftIcon className="w-10" />
        </Link>
    );
}
