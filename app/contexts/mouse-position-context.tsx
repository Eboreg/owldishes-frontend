"use client";

import React, { createContext, useContext, useState } from "react";
import type { MousePosition, MousePositionContextType, Rect } from "@/app/lib/definitions";

const MousePositionContext = createContext<MousePositionContextType | undefined>(undefined);

export function MousePositionProvider({ children }: { children: React.ReactNode }) {
    const [mousePosition, setMousePosition] = useState<MousePosition | undefined>();

    return (
        <MousePositionContext.Provider value={{ mousePosition, setMousePosition }}>
            {children}
        </MousePositionContext.Provider>
    );
}

export function useMousePosition(): MousePositionContextType {
    return useContext(MousePositionContext)!;
}

export function isMouseOver(rect: Rect, mousePosition?: MousePosition): boolean {
    return (
        mousePosition != undefined &&
        mousePosition.x >= rect.left &&
        mousePosition.x <= rect.left + rect.width &&
        mousePosition.y >= rect.top &&
        mousePosition.y <= rect.top + rect.height
    );
}
