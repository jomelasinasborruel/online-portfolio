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
  // {
  //   key: "projects",
  //   label: "Projects",
  //   component: <React.Fragment></React.Fragment>,
  // },
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
      <motion.div
        key="intro-container-key"
        className={clsx(
          "fixed left-0 top-0 z-10 h-screen w-screen bg-[#191919]",
        )}
        animate={
          scrollY > 900
            ? {
                pointerEvents: "none",
                opacity: 0,
              }
            : {
                pointerEvents: "auto",
                opacity: 1,
                transition: {
                  opacity: { delay: 0.5 },
                  pointerEvents: { delay: 0.5 },
                },
              }
        }
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
      </motion.div>
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

  return (
    <main className={clsx(cx["main"])}>
      {renderIntroduction}

      <motion.div
        key="details-container-key"
        ref={mainRef}
        id="details-container"
        className={cx["details-container"]}
      >
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
