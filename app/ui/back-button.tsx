import { ArrowTurnUpLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/back-button.module.css";
import { useState } from "react";

export default function BackButton({ href, show }: { href: string; show: boolean }) {
    const [forceShow, setForceShow] = useState<boolean>(false);

    return (
        <Link
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
