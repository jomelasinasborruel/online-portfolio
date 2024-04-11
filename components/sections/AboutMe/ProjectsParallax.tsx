import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export default function ProjectsParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <div
      ref={ref}
      className="relative grid h-[60dvh] w-full place-items-center overflow-hidden bg-black"
    >
      <AnimatePresence>
        <motion.div
          style={{ y: backgroundY }}
          className="relative mt-[-50dvh] h-[100dvh] w-full"
        >
          <Image
            fill
            alt="banner-bg"
            className="absolute inset-0 h-full w-full object-cover grayscale-[100%]"
            src={"/images/bg-banner-about.jpg"}
          />
        </motion.div>
        <div className="absolute left-0 top-0 h-full w-full bg-[#191919cc]" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none justify-center font-semibold text-[#191919]">
          {"Projects".split("").map((letter, index) => (
            <motion.div
              key={`${letter}-${index}`}
              className="inline-block font-earthOrbiter text-5xl text-[#d3a121] sm:text-8xl"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{
                opacity: 100,
                y: 0,
                transition: {
                  delay: [3, 4].includes(index)
                    ? 0
                    : [2, 5].includes(index)
                      ? 0.1
                      : [1, 6].includes(index)
                        ? 0.3
                        : 0.5,
                  duration: 0.3,
                },
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
