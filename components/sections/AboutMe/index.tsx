import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProjectsParallax from "./ProjectsParallax";
import clsx from "clsx";
import Link from "next/link";

type Experience =
  | "React"
  | "NextJs"
  | "Prisma"
  | "GraphQL"
  | "SASS"
  | "Tailwind";

type Project = "realPh" | "agentImage" | "access" | "pikme" | "fortiserv";

const AboutMe = () => {
  const [activeExp, setActiveExp] = useState<Experience>();

  const experience: { title: Experience; description: string }[] = [
    { title: "React", description: "2 Years of Experience" },
    { title: "NextJs", description: "2 Years of Experience" },
    { title: "Prisma", description: "2 Years of Experience" },
    { title: "GraphQL", description: "2 Years of Experience" },
    { title: "SASS", description: "2 Years of Experience" },
    { title: "Tailwind", description: "2 Years of Experience" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [currentProjects, setCurrentProject2] = useState<Project>("access");
  const [ownCurrentProjects, setOwnCurrentProjects] =
    useState<Project>("pikme");

  const projects: {
    key: Project;
    image: string;
    title: string;
    description: string;
    url: string;
    isMine: boolean;
  }[] = [
    {
      key: "access",
      image:
        "https://res.cloudinary.com/jmcloudname/image/upload/c_crop,g_north,h_2000,w_1920/c_limit,w_1440/online-portfolio/images/projects/mriz9ldpgwypt1alaoma.jpg",
      title: "Access",
      description: `Website for creating websites and listing presentations`,
      url: "https://access.com/",
      isMine: false,
    },
    {
      key: "realPh",
      image:
        "https://res.cloudinary.com/jmcloudname/image/upload/c_scale,w_1080/online-portfolio/images/projects/cizqbr27qhbkzrac86pv.jpg",
      title: "RealPh",
      description: `Website for creating websites for realtor agents`,
      url: "https://builder.real.ph/",
      isMine: false,
    },
    {
      key: "agentImage",
      image:
        "https://res.cloudinary.com/jmcloudname/image/upload/c_crop,g_north,h_2000,w_1920/c_scale,w_1440/online-portfolio/images/projects/id15b0qztc9k8sjy0bni.jpg",
      title: "Agent Image",
      description: `Award-winning websites for the world's leading agents, teams and brokerages that empowers Realtors to generate leads and close deals. 8000+ 5-star reviews.`,
      url: "https://www.agentimage.com/",
      isMine: false,
    },
    {
      key: "pikme",
      image:
        "https://res.cloudinary.com/jmcloudname/image/upload/f_auto,q_auto/v1/online-portfolio/images/projects/lpj4owhep9oeohwtl006",
      title: "Pik-Me",
      description: `My simple browser game.`,
      url: "https://pik-me.vercel.app/",
      isMine: true,
    },
    {
      key: "fortiserv",
      image:
        "https://res.cloudinary.com/jmcloudname/image/upload/c_crop,g_north,h_2000,w_1703/c_scale,w_1440/online-portfolio/images/projects/kcoegappq7aedoyqvwli.jpg",
      title: "Fortiserv",
      description: `Business Mangement Company's Marketing Website`,
      url: "https://fs-bmec.vercel.app/",
      isMine: true,
    },
  ];

  return (
    <div className="flex max-w-full flex-col overflow-hidden font-acre">
      <div className="flex w-full justify-center self-center bg-[#191919] px-8 pb-3 pt-10">
        <p className="w-full max-w-[1280px] text-xl text-white md:text-3xl">
          Tech Stack
        </p>
      </div>
      {
        <div className="grid w-full justify-items-center self-center bg-[#191919] pb-10">
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
                    delay: 0.3,
                  },
                }}
                className="font-semiboldjustify-items-center flex w-full select-none 
                justify-center bg-[#191919] px-6 py-1  text-5xl text-[#a9a9a9] sm:text-7xl md:text-9xl"
              >
                <div className="w-full max-w-[80rem] uppercase">
                  <p
                    className="w-fit"
                    onMouseEnter={() => {
                      setActiveExp(item.title);
                    }}
                    onMouseLeave={() => {
                      setActiveExp(undefined);
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.div>
              <motion.div
                animate={
                  activeExp === item.title
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
                  <p className="w-fit max-sm:hidden">{item.title}</p>
                  <p className="ml-4 font-acre text-sm">- {item.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      }
      <ProjectsParallax />
      <div className="flex h-fit w-full flex-col items-center bg-[#191919] p-10 max-lg:px-6">
        <p className="mb-4 w-full max-w-[1280px] text-xl text-white md:text-3xl">
          Projects I&apos;ve worked on.
        </p>
        <div className="flex h-[43.75rem] w-full max-w-[80rem] flex-col overflow-hidden max-lg:space-y-4 lg:h-[48rem] lg:flex-row lg:space-x-4">
          {projects
            .filter((item) => !item.isMine)
            .map((item, index) => (
              <motion.div
                key={`${item.key}-${index}`}
                initial={{ y: "50%" }}
                whileInView={{
                  y: 0,
                  transition: { delay: index * 0.05, duration: 0.5 },
                }}
                animate={
                  item.key === currentProjects
                    ? { flexGrow: 1, transition: { duration: 1 } }
                    : { flexGrow: 0, transition: { duration: 1 } }
                }
                viewport={{ once: true }}
                role="button"
                onAnimationComplete={() => setIsLoading(false)}
                onClick={() => {
                  if (currentProjects === item.key) return;
                  setCurrentProject2(item.key);
                  setIsLoading(true);
                }}
                className={clsx(
                  "relative w-full overflow-hidden rounded-lg border-2 border-[#6b551e] bg-[#191919] max-lg:h-[10%] lg:w-[10%]",
                  { "pointer-events-none": currentProjects === item.key },
                )}
              >
                <div className="relative h-full w-full">
                  <Image
                    fill
                    alt={item.key}
                    src={item.image}
                    className=" !absolute top-0 !h-auto !w-full max-lg:!top-16 lg:!left-10 lg:!w-[calc(100%-2.5rem)]"
                  />
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#191919] to-[#19191979]" />
                </div>

                <div
                  className={clsx(
                    "absolute inset-0 h-full w-full overflow-hidden transition-colors duration-500",
                    { "bg-[#191919]": item.key !== currentProjects },
                  )}
                />
                <div className="absolute left-0 top-0 h-16 w-10 bg-[#191919] max-lg:w-full lg:h-full" />
                <div
                  className={clsx(
                    "absolute bottom-0 w-[calc(100%-40px)] p-4 opacity-0 transition-opacity duration-[500ms] lg:left-10",
                    {
                      "opacity-100":
                        item.key === currentProjects && isLoading === false,
                    },
                  )}
                >
                  <h3 className="mb-2 text-5xl text-white"> {item.title}</h3>
                  <Link
                    className={clsx(
                      " pointer-events-none mb-4 inline-block transition-colors duration-500 hover:text-[#d3a121]",
                      {
                        "pointer-events-auto":
                          item.key === currentProjects && isLoading === false,
                      },
                    )}
                    target="_blank"
                    href={item.url}
                  >
                    {item.url}
                  </Link>
                  <p>{item.description}</p>
                </div>
                <div
                  className={clsx(
                    "absolute left-4 top-2 origin-top-left whitespace-pre text-left text-3xl text-[#d3a121] transition-all duration-300 ease-linear lg:left-10 lg:top-3 lg:rotate-90 lg:text-4xl",
                    {
                      "lg:!left-[4.375rem] lg:!text-6xl":
                        item.key !== currentProjects,
                    },
                  )}
                >
                  {item.title}
                </div>
              </motion.div>
            ))}
        </div>
        <p className="mb-4 mt-10 w-full max-w-[1280px] text-xl text-white md:text-3xl">
          My solo projects (as of now).
        </p>
        <div className="flex h-[43.75rem] w-full max-w-[80rem] flex-col overflow-hidden max-lg:space-y-4 lg:h-[48rem] lg:flex-row lg:space-x-4">
          {projects
            .filter((item) => item.isMine)
            .map((item, index) => (
              <motion.div
                key={`${item.key}-${index}`}
                initial={{ y: "50%" }}
                whileInView={{
                  y: 0,
                  transition: { delay: index * 0.05, duration: 0.5 },
                }}
                animate={
                  item.key === ownCurrentProjects
                    ? { flexGrow: 1, transition: { duration: 1 } }
                    : { flexGrow: 0, transition: { duration: 1 } }
                }
                viewport={{ once: true }}
                role="button"
                onAnimationComplete={() => setIsLoading2(false)}
                onClick={() => {
                  if (ownCurrentProjects === item.key) return;
                  setOwnCurrentProjects(item.key);
                  setIsLoading2(true);
                }}
                className={clsx(
                  "relative w-full overflow-hidden rounded-lg border-2 border-[#6b551e] bg-[#191919] max-lg:h-[10%] lg:w-[10%]",
                  { "pointer-events-none": ownCurrentProjects === item.key },
                )}
              >
                <div className="relative h-full w-full">
                  <Image
                    fill
                    alt={item.key}
                    src={item.image}
                    className=" !absolute top-0 !h-auto !w-full max-lg:!top-16 lg:!left-10 lg:!w-[calc(100%-2.5rem)]"
                  />
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#191919] to-[#19191979]" />
                </div>

                <div
                  className={clsx(
                    "absolute inset-0 h-full w-full overflow-hidden transition-colors duration-500",
                    { "bg-[#191919]": item.key !== ownCurrentProjects },
                  )}
                />
                <div className="absolute left-0 top-0 h-16 w-10 bg-[#191919] max-lg:w-full lg:h-full" />
                <div
                  className={clsx(
                    "absolute bottom-0 w-[calc(100%-40px)] p-4 opacity-0 transition-opacity duration-[500ms] lg:left-10",
                    {
                      "opacity-100":
                        item.key === ownCurrentProjects && isLoading2 === false,
                    },
                  )}
                >
                  <h3 className="mb-2 text-5xl text-white"> {item.title}</h3>
                  <Link
                    className={clsx(
                      " pointer-events-none mb-4 inline-block transition-colors duration-500 hover:text-[#d3a121]",
                      {
                        "pointer-events-auto":
                          item.key === ownCurrentProjects &&
                          isLoading2 === false,
                      },
                    )}
                    target="_blank"
                    href={item.url}
                  >
                    {item.url}
                  </Link>
                  <p>{item.description}</p>
                </div>
                <div
                  className={clsx(
                    "absolute left-4 top-2 origin-top-left whitespace-pre text-left text-3xl text-[#d3a121] transition-all duration-300 ease-linear lg:left-10 lg:top-3 lg:rotate-90 lg:text-4xl",
                    {
                      "lg:!left-[4.375rem] lg:!text-6xl":
                        item.key !== ownCurrentProjects,
                    },
                  )}
                >
                  {item.title}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
