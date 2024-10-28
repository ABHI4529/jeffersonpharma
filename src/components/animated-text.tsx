"use client";

import { motion } from "framer-motion";

export const AnimatedText = ({ text, split, className } : {text : string, split : string, className: string}) => {
    const words = text.split(split);
    
    // Container animation with reduced stagger and delay
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { 
          staggerChildren: 0.05, // Reduced from 0.12
          delayChildren: 0.02 * i  // Reduced from 0.04
        },
      }),
    };
  
    // Word animation with faster spring settings
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 20, // Increased from 12 for faster settling
          stiffness: 200, // Increased from 100 for faster movement
          duration: 0.1 // Added explicit duration
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 200,
          duration: 0.1
        },
      },
    };
  
    return (
      <motion.div
        style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
            duration: 0.1 // Reduced from 0.2
        }}
        className="z-[9]"
      >
        {words.map((word : any, index : any) => (
          <motion.span
            variants={child}
            key={index}
            className={className}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };