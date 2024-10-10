"use client";

// components/AnimatedCounter.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    from: number;
    to: number;
    duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from, to, duration = 2 }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Trigger only once

    useEffect(() => {
        if (!isInView) return; // Do nothing if the component is not in view

        const startTime = performance.now();

        const updateCounter = (currentTime: number) => {
            const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds
            const progress = Math.min(elapsedTime / duration, 1); // clamp to 1
            const newCount = Math.round(from + progress * (to - from));

            setCount(newCount);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [from, to, duration, isInView]);

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0}}
            animate={{opacity: isInView ? 1 : 0}}
            transition={{duration: 0.5}}
        >
            <p className={"text-2xl font-bold"}>{count}</p>
        </motion.div>
    );
};

export default AnimatedCounter;
