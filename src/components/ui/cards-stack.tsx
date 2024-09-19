"use client";
import React, { useEffect, useState, useImperativeHandle, forwardRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

let interval: any;

export const CardStack = forwardRef(function CardStack(
    { children, offset, scaleFactor, api }: { children: ReactNode; offset?: number; scaleFactor?: number; api?: any },
    ref
) {
    const CARD_OFFSET = offset || 15;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<ReactNode[]>([]);
    const [cardOrder, setCardOrder] = useState<number[]>([]); // Keep track of card indices order
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    useEffect(() => {
        const initialOrder = React.Children.toArray(children).map((_, index) => index);
        setCardOrder(initialOrder); // Initialize the card order based on children
        setCards(React.Children.toArray(children));
    }, [children]);

    const nextCard = () => {
        setDirection('next');
        setCardOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder.push(newOrder.shift()!); // Move the first item to the end
            return newOrder;
        });
    };

    const prevCard = () => {
        setDirection('prev');
        setCardOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder.unshift(newOrder.pop()!); // Move the last item to the front
            return newOrder;
        });
    };

    useImperativeHandle(ref, () => ({
        nextCard,
        prevCard,
    }));

    return (
        <div className="relative w-full flex justify-center items-center h-screen">
            <AnimatePresence initial={false}>
                {cardOrder.map((cardIndex, index) => {
                    return (
                        <motion.div
                            key={cardIndex} // Use cardIndex to ensure unique keys
                            className="absolute"
                            style={{
                                transformOrigin: "top center",
                            }}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                top: index * -CARD_OFFSET,
                                scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                                zIndex: cardOrder.length - index, // decrease z-index for the cards that are behind
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -50,
                                scale: 0.9,
                                transition: { duration: 0.5 },
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                        >
                            {cards[cardIndex]} {/* Render the card based on current order */}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
});

export const CardItem = ({
                             children,
                             className,
                         }: {
    children: ReactNode;
    className?: string;
}) => {
    return <div className={className}>{children}</div>;
};
