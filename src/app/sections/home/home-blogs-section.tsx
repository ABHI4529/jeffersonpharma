"use client";

import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BsArrowUpRight } from "react-icons/bs";
import { DatabaseService } from "@/core/database-service";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView, Variants } from "framer-motion";
import { EmblaCarouselType } from "embla-carousel";
import lines from "@/assets/blogs-background.svg";

interface BlogPost {
  id: string;
  get: (field: string) => string;
}

const HomeBlogsSection: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true,
    margin: "0px 0px -100px 0px"
  });

  useEffect(() => {
    DatabaseService().getAllBlogs().then((data) => {
      setBlogs(data.docs);
    });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const backgroundVariants: Variants = {
    hidden: { 
      scale: 1.2,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative overflow-hidden px-[4%] md:px-[8%] pt-10 pb-20">
      <motion.img 
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute left-0 right-0 top-0 bottom-10 object-cover h-full w-[100%]" 
        src={lines.src} 
        alt="animation"
      />
      
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-[9]"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-lg md:text-2xl font-bold"
        >
          Latest News
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xs md:text-sm text-muted-foreground"
        >
          Keep checking out our news articles for latest updates.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="mt-8"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 5000
              })
            ]}
          >
            <CarouselContent>
              {blogs.map((blog, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="relative rounded-[30px] h-[250px] md:h-[300px] flex flex-col">
                    <img
                      src={blog.get("coverImage")}
                      className="absolute w-full h-full object-cover rounded-[30px]"
                      alt="news"
                    />
                    <div className="absolute justify-between border border-[#D2D2D2] rounded-[30px] flex p-6 flex-col bg-gradient-to-r from-white to-white/60 h-full w-full">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-lg md:text-xl font-bold">
                          {blog.get("title")}
                        </h1>
                        <p className="text-xs md:text-sm">
                          {blog.get("description").substring(0, 100)}...
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push(`/blogs/${blog.id}`)}
                        size="sm"
                        className="gap-2 w-32 h-9 md:h-8 self-end"
                      >
                        Read More
                        <BsArrowUpRight />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex gap-3 items-center justify-center mt-8"
        >
          <Button
            variant="link"
            onClick={() => api?.scrollPrev()}
          >
            <IoArrowBack />
          </Button>
          <Button
            variant="link"
            onClick={() => api?.scrollNext()}
          >
            <IoArrowForward />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeBlogsSection;