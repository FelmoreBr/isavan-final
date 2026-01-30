"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
    children,
    containerClassName,
    className,
}: {
    children: React.ReactNode;
    containerClassName?: string;
    className?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };

    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const xVal = (clientX - (rect.left + rect.width / 2)) / 20;
        const yVal = (clientY - (rect.top + rect.height / 2)) / 20;
        mouseX.set(xVal);
        mouseY.set(yVal);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                x,
                y,
            }}
            className={cn(
                "mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden",
                containerClassName
            )}
        >
            <div
                className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
                style={{
                    boxShadow:
                        "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
                }}
            >
                <motion.div
                    style={{
                        x: useTransform(x, (val) => -val),
                        y: useTransform(y, (val) => -val),
                        scale: isHovering ? 1.03 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={cn("h-full px-4 py-20 sm:px-10 relative", className)}
                >
                    <Noise />
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

const Noise = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
                backgroundImage: "url(/noise.png)",
                backgroundSize: "30%",
            }}
        ></div>
    );
};
