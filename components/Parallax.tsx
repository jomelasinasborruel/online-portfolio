import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function IntroductionParallax({ scrollY }: { scrollY: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  console.log({ scrollYProgress }); //
  return (
    <div
      ref={ref}
      className="relative grid h-screen w-full place-items-center overflow-hidden bg-black"
    >
      {/* <motion.h1
        style={{ y: textY }}
        className="relative z-10 text-7xl font-bold text-white md:text-9xl"
      >
        PARALLAX
      </motion.h1> */}

      <motion.video
        style={{ y: backgroundY }}
        autoPlay
        playsInline
        loop
        muted
        // ref={videoRef}
        className={
          "pointer-events-none absolute inset-0  h-full w-full object-cover transition-opacity duration-500"
        }
        src="https://res.cloudinary.com/jmcloudname/video/upload/f_auto:video,q_auto/v1/online-portfolio/videos/v9xldgfnoau5kpmzv6uk"
      />
      <motion.div
        className={
          "absolute left-1/2 top-1/2 block min-w-[13.875rem] -translate-x-1/2 -translate-y-1/2 select-none px-3 text-center font-earthOrbiter text-xl tracking-widest sm:text-4xl"
        }
        animate={scrollY > 1700 ? { opacity: 0 } : ""}
      >
        <motion.span
          animate={
            scrollY >= 1100 && scrollY < 1400 ? { color: "#FFFFFF" } : ""
          }
        >
          Rest in reason,
        </motion.span>{" "}
        <motion.span animate={scrollY >= 1400 ? { color: "#FFFFFF" } : ""}>
          move in passion.
        </motion.span>
      </motion.div>
      {scrollY > 1700 && (
        <motion.div
          style={{ y: textY }}
          className="relative flex select-none justify-center font-semibold text-[#191919]"
        >
          {"jomel".split("").map((letter, index) => (
            <motion.div
              key={`${letter}-${index}`}
              className="inline-block font-earthOrbiter text-5xl tracking-widest text-[#d3a121] sm:text-8xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 100,
                y: 0,
                transition: {
                  delay:
                    index == 2 ? 0 : index === 1 || index === 3 ? 0.3 : 0.5,
                  duration: 0.3,
                },
              }}
              // viewport={{ once: true }}
              // onAnimationComplete={() => setIsGreetingDone(true)}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
