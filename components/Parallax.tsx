import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function IntroductionParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    console.log({ scrollYProgress });
  }, [scrollYProgress]);
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
    </div>
  );
}
