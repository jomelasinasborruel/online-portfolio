import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Experience =
  | "ReactJs"
  | "NextJs"
  | "Prisma"
  | "GraphQL"
  | "SASS"
  | "Tailwind";

const AboutMe = () => {
  const [isGreetingDone, setIsGreetingDone] = useState(false);
  const [activeExp, setActiveExp] = useState<Experience>();
  const experience: Experience[] = [
    "ReactJs",
    "NextJs",
    "Prisma",
    "GraphQL",
    "SASS",
    "Tailwind",
  ];
  return (
    <div className="flex max-w-full flex-col overflow-hidden font-acre">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        className="relative h-[40vh] w-full self-center px-8 py-10 md:h-[60dvh]"
      >
        <Image
          fill
          alt="banner-bg"
          className="absolute left-0 top-0 h-full w-full object-cover grayscale-[100%]"
          src={"/images/bg-banner-about.jpg"}
        />
        <div className="absolute left-0 top-0 h-full w-full bg-[#191919cc]" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none justify-center font-semibold text-[#191919]">
          {"jomel".split("").map((letter, index) => (
            <motion.div
              key={`${letter}-${index}`}
              className="inline-block font-earthOrbiter text-5xl text-[#d3a121] sm:text-8xl"
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
              onAnimationComplete={() => setIsGreetingDone(true)}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="flex w-full justify-center self-center bg-[#191919] px-8 pb-3 pt-10">
        <p className="w-full max-w-[1280px] text-xl text-white md:text-3xl">
          Tech Stack
        </p>
      </div>
      {
        <div className="grid w-full justify-items-center self-center pb-10">
          {experience.map((item, index) => (
            <div key={`${item}-${index}`} className="relative w-full">
              <motion.div
                initial={{ x: 100, opacity: 0, pointerEvents: "none" }}
                viewport={{ once: true }}
                whileInView={{
                  x: 0,
                  opacity: 100,
                  borderBottom: ".5px solid #535353",
                  pointerEvents: "auto",
                  transition: {
                    duration: 0.5,
                    delay: index * 0.3,
                  },
                }}
                className="font-semiboldjustify-items-center flex w-full select-none 
                justify-center bg-[#191919] px-6 py-1  text-5xl text-[#a9a9a9] sm:text-7xl md:text-9xl"
              >
                <div className="w-full max-w-[80rem] uppercase">
                  <p
                    className="w-fit"
                    onMouseEnter={() => {
                      setActiveExp(item as Experience);
                    }}
                    onMouseLeave={() => {
                      setActiveExp(undefined);
                    }}
                  >
                    {item}
                  </p>
                </div>
              </motion.div>
              <motion.div
                animate={
                  activeExp === item
                    ? {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        color: "black",
                        transition: { ease: "easeInOut", duration: 0.3 },
                      }
                    : {}
                }
                className="font-semiboldjustify-items-center pointer-events-none absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 justify-center overflow-hidden bg-white px-6 py-1  text-5xl text-[#a9a9a9] [clip-path:polygon(0_50%,_100%_50%,_100%_50%,_0_50%)] sm:text-7xl md:text-9xl"
              >
                <div className="relative flex w-full max-w-[80rem] items-center uppercase">
                  <p className="w-fit max-sm:hidden">{item}</p>
                  <p className="ml-4 font-acre text-sm">
                    {" "}
                    - Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default AboutMe;
