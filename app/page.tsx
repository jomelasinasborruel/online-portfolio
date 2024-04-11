"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
// Components
import { Model } from "@/models/glasses";
import { Canvas } from "@react-three/fiber";
import {
  Variants,
  animate,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
// Utils
import { delay } from "lodash";
import clsx from "clsx";
import zenScroll from "zenscroll";
// SVGs
import { GrInstagram } from "react-icons/gr";
import { ImCross, ImFacebook, ImLinkedin2 } from "react-icons/im";
import { BsArrowBarDown } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
// Styles
import cx from "./MainPage.module.scss";
import { useProgress } from "@react-three/drei";
import ReactLoading from "react-loading";
import Marquee from "react-fast-marquee";
import AboutMe from "@/components/sections/AboutMe";
import { GiHamburgerMenu } from "react-icons/gi";
import IntroductionParallax from "@/components/IntroductionParallax";

interface NavItem {
  key: "aboutMe" | "projects" | "logo" | "myGallery" | "devTips";
  label: string;
  component: React.JSX.Element;
}

const NAVITEMS: NavItem[] = [
  {
    key: "aboutMe",
    label: "About Me",
    component: <AboutMe />,
  },
  {
    key: "projects",
    label: "Projects",
    component: <React.Fragment></React.Fragment>,
  },

  {
    key: "myGallery",
    label: "My Gallery",
    component: <React.Fragment></React.Fragment>,
  },
  {
    key: "devTips",
    label: "Dev Tips",
    component: <React.Fragment></React.Fragment>,
  },
];

const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [videoSectionRef, videoSectionInviewRef] = useInView();
  const loadingProgress = useProgress();
  const [hasVisited, setHadVisited] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const [mainRef, mainInview] = useInView({
    threshold: 1,
  });
  const [currentPage, setCurrentPage] = useState<NavItem["key"]>("aboutMe");
  const [isStructureAnimationDone, setIsStructureAnimationDone] =
    useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number>();
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ffSpan } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });

  const handleScroll = () => {
    zenScroll.toY(1100, 2000);
    delay(() => {
      zenScroll.toY(1400, 500);
    }, 3000);

    delay(() => {
      zenScroll.toY(1800, 500);
    }, 4000);
    delay(() => {
      zenScroll.toY(2000 + window.innerHeight * (1 / 3), 1500);
    }, 5500);
  };
  const handleScoll = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 1000 || window.scrollY < 0) return;
    setScrollTop(0.314 * (window.scrollY / 100));
  };

  const renderIntroduction = (
    <div ref={introRef} className={clsx(cx["introduction--container"])}>
      <div
        className={clsx(
          "fixed left-0 top-0 z-10 h-screen w-screen bg-[#191919] transition-opacity duration-500",
          {
            "!pointer-events-none !opacity-0": scrollY > 900,
          },
        )}
      >
        <Marquee
          autoFill
          className={clsx(
            "select pointer-events-none !fixed left-0 top-0 h-screen w-full opacity-5 transition-opacity duration-500",
          )}
          speed={10}
        >
          <p className={clsx(cx["marquee-text"])}>
            {"ASSESGL".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </p>
        </Marquee>

        <Canvas
          id="glasses-canvas"
          className={clsx(cx["model-canvas"], {
            "!pointer-events-none !opacity-0": scrollY > 900,
          })}
        >
          <Suspense fallback={null}>
            <ambientLight />
            <Model scrollTop={scrollTop} />
          </Suspense>
        </Canvas>

        <button
          onClick={handleScroll}
          className={clsx(cx["btn-scroll"], {
            "pointer-events-none !opacity-0": scrollY > 200,
          })}
        >
          <p className="font-acre">Click to scroll</p>

          <BsArrowBarDown />
        </button>
      </div>
      <div className={clsx(cx["video-section"], {})}>
        <IntroductionParallax scrollY={scrollY} />
      </div>
    </div>
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScoll);
    setScrollTop(0.314 * (window.scrollY / 100));
    // scrollTo({ top: 0 });

    return () => window.removeEventListener("scroll", handleScoll);
  }, []);

  useEffect(() => {
    if (hasVisited || !mainInview) return;
    setHadVisited(true);
  }, [mainInview]);

  // Optimizes the loading
  if (loadingProgress.progress !== 100)
    return (
      <main
        className={clsx(cx["main"], {
          "max-h-screen overflow-hidden": loadingProgress.progress !== 100,
        })}
      >
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <ReactLoading type="bubbles" delay={500} color="#a9a9a9" />
        </div>
      </main>
    );

  const variants: Variants | undefined = {};

  return (
    <main className={clsx(cx["main"])}>
      {renderIntroduction}

      <motion.div
        ref={mainRef}
        id="details-container"
        className={cx["details-container"]}
      >
        {/* <motion.nav
          initial={{ color: "#191919", width: 100, paddingInline: 0 }}
          className="sticky top-0 z-[100] mx-auto flex w-fit justify-center pb-[10px]"
          variants={variants}
          animate={hasVisited ? "navBar" : ""}
          onAnimationComplete={() => setIsStructureAnimationDone(true)}
        >
          <div className="flex w-full max-w-[80rem] justify-between">
            <motion.div
              initial={{ background: "transparent", color: "#a9a9a9" }}
              variants={variants}
              animate={hasVisited ? "navLogo" : ""}
              className={cx["logo"]}
            >
              Jm
            </motion.div>
            <div className="hidden  grid-flow-col gap-10 lg:grid">
              {NAVITEMS.map((item) => {
                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0 }}
                    animate={hasVisited ? "navButton" : ""}
                    variants={variants}
                    onClick={() => setCurrentPage(item.key)}
                    whileHover={{ color: "white" }}
                    className={clsx(
                      "w-[5.5rem] text-[#a9a9a9] transition-colors duration-300",
                      {
                        "!text-white": item.key === currentPage,
                      },
                    )}
                  >
                    {item.label}
                    <div
                      className={clsx(
                        "h-[0.375rem] w-0 border-b border-b-white transition-[width] duration-300",
                        { "!w-full": item.key === currentPage },
                      )}
                    />
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              onClick={() => setToggleMobileNav((prev) => !prev)}
              initial={{ opacity: 0 }}
              animate={hasVisited ? "navButton" : ""}
              variants={variants}
              className="block lg:hidden"
            >
              {toggleMobileNav ? (
                <ImCross className="fill-white" />
              ) : (
                <GiHamburgerMenu className="fill-white" />
              )}
            </motion.button>
            <motion.div
              animate={
                toggleMobileNav
                  ? { x: -200, transition: { type: "just" } }
                  : { x: 0 }
              }
              className="fixed right-[-200px] top-0 z-[100] mt-[74px] flex h-[calc(100dvh-74px)] w-[200px] flex-col bg-white lg:hidden"
            >
              {NAVITEMS.map((item) => {
                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0 }}
                    animate={hasVisited ? "navButton" : ""}
                    variants={variants}
                    onClick={() => setCurrentPage(item.key)}
                    className={clsx(
                      "w-full p-3 text-[#191919] transition-colors duration-300",
                      {
                        "bg-slate-500 !text-white": item.key === currentPage,
                      },
                    )}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.nav> */}
        <div className={cx["content"]}>
          <div
            ref={contentRef}
            key={currentPage}
            className={cx["content-wrapper"]}
          >
            {NAVITEMS.find((item) => item.key === currentPage)?.component}
          </div>
        </div>
        <footer className="pb-8 text-[#a9a9a9]">
          <div className={cx["socials-container"]}>
            {SOCIALS.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target={social.target}
                onMouseEnter={() => setHoveredSocial(index)}
                onMouseLeave={() => setHoveredSocial(undefined)}
                className={clsx({
                  "!opacity-50":
                    hoveredSocial !== undefined && hoveredSocial !== index,
                })}
              >
                {social.icons}
              </Link>
            ))}
          </div>
        </footer>
      </motion.div>
    </main>
  );
};

export default Home;

const SOCIALS: {
  url: string;
  icons: JSX.Element;
  target: React.HTMLAttributeAnchorTarget;
}[] = [
  {
    url: "https://www.facebook.com/UsernameBlocked0/",
    icons: <ImFacebook />,
    target: "_blank",
  },
  {
    url: "https://www.instagram.com/jmmmmm_07/",
    icons: <GrInstagram />,
    target: "_blank",
  },
  {
    url: "https://www.linkedin.com/in/jomel-borruel-a42096218/",
    icons: <ImLinkedin2 />,
    target: "_blank",
  },
  {
    url: "mailto:jomelaborruel@gmail.com",
    icons: <FiMail />,
    target: "_self",
  },
  { url: "tel:09985822142", icons: <FaPhoneAlt />, target: "_self" },
];
