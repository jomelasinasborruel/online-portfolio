"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
// Components
import { Model } from "@/models/glasses";
import { Canvas } from "@react-three/fiber";
import { Variants, animate, motion } from "framer-motion";
// Utils
import { delay } from "lodash";
import clsx from "clsx";
import zenScroll from "zenscroll";
// SVGs
import { GrInstagram } from "react-icons/gr";
import { ImFacebook, ImLinkedin2 } from "react-icons/im";
import { BsArrowBarDown } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
// Styles
import cx from "./MainPage.module.scss";
import { useProgress } from "@react-three/drei";
import ReactLoading from "react-loading";
import Marquee from "react-fast-marquee";

interface NavItem {
  key: "aboutMe" | "projects" | "logo" | "myGallery" | "devTips";
  label: string;
  component: React.JSX.Element;
}

const NAVITEMS: NavItem[] = [
  {
    key: "aboutMe",
    label: "About Me",
    component: (
      <div className="pt-10">
        <h3>What is Lorem Ipsum? </h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    ),
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSectionRef, videoSectionInviewRef] = useInView();
  const loadingProgress = useProgress();
  const [hasVisited, setHadVisited] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mainRef, mainInview] = useInView({
    threshold: 1,
  });
  const [currentPage, setCurrentPage] = useState<NavItem["key"]>("aboutMe");

  const [hoveredSocial, setHoveredSocial] = useState<number>();

  const handleScroll = () => {
    zenScroll.toY(1100, 2000);
    delay(() => {
      zenScroll.toY(1200, 500);
    }, 3000);
    delay(() => {
      zenScroll.toY(window.scrollY + window.innerHeight, 1000);
    }, 4700);
  };
  const handleScoll = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 1000 || window.scrollY < 0) return;
    setScrollTop(0.314 * (window.scrollY / 100));
  };

  const renderIntroduction = (
    <div
      className={clsx(cx["introduction--container"], {
        "pointer-events-none": videoSectionInviewRef || mainInview,
      })}
    >
      <Marquee
        autoFill
        className={clsx(
          "!fixed w-full h-screen top-0 left-0 opacity-5 select transition-opacity duration-500",
          { "!opacity-0": scrollY > 900 }
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
          "!opacity-0": videoSectionInviewRef || mainInview,
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
          "!opacity-0 pointer-events-none": scrollY > 200,
        })}
      >
        <p>Click to scroll</p>

        <BsArrowBarDown />
      </button>

      <div
        ref={videoSectionRef}
        className={clsx(cx["video-section"], {
          "!opacity-100 !pointer-events-auto":
            videoSectionInviewRef && !mainInview,
        })}
      >
        <video
          autoPlay
          playsInline
          loop
          muted
          ref={videoRef}
          className={clsx(cx["video"])}
          src="https://res.cloudinary.com/jmcloudname/video/upload/f_auto:video,q_auto/v1/online-portfolio/videos/v9xldgfnoau5kpmzv6uk"
        />
        <p className={clsx(cx["video-caption"])}>
          <span
            className={clsx("transition-colors duration-500", {
              "text-white": scrollY >= 1100 && scrollY < 1200,
            })}
          >
            Rest in reason,
          </span>{" "}
          <span
            className={clsx("transition-colors duration-500", {
              "text-white": scrollY >= 1200 && scrollY < 1300,
            })}
          >
            move in passion.
          </span>
        </p>
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
        <div className="top-1/2 left-1/2 fixed -translate-y-1/2 -translate-x-1/2 ">
          <ReactLoading type="bubbles" delay={500} color="#a9a9a9" />
        </div>
      </main>
    );

  const variants: Variants | undefined = {
    detailsContainer: {
      y: 0,
      opacity: 100,

      transition: {
        delay: 2,
        duration: 2,
        opacity: { delay: 1, duration: 1 },
        ease: [0.36, 0.305, 0.4, 0.86],
        type: "spring",
        bounce: 0.1,
      },
    },
    content: {
      minHeight: "calc(100vh - 135px)",
      transition: {
        delay: 3,
        duration: 1.5,
        type: "spring",
        ease: "0.550, 0.085, 0.680, 0.530",
      },
    },
    navButton: {
      opacity: 100,
      transition: {
        delay: 4.5,
        duration: 0.5,
      },
    },
    navBar: {
      background: "#191919",
      paddingInline: "32px",
      width: "100%",
      paddingTop: 16,
      marginLeft: 0,
      boxShadow: `
         0px 6.6px 11.3px rgba(0, 0, 0, 0.059), 
         0px 16px 28.5px rgba(0, 0, 0, 0.084),
         0px 29px 58.1px rgba(0, 0, 0, 0.106), 
         0px 40.3px 119.7px rgba(0, 0, 0, 0.131), 
         0px 45px 328px rgba(0, 0, 0, 0.19)`,
      transition: {
        paddingTop: { delay: 2, duration: 1.5, bounce: 0.2, type: "spring" },
        marginLeft: { delay: 3.7, duration: 1.5, bounce: 0.2, type: "spring" },
        delay: 4.5,
        duration: 0.5,
      },
    },
    navLogo: {
      color: "white",
      transition: { delay: 4.5, duration: 0.5 },
    },
  };

  return (
    <main className={clsx(cx["main"])}>
      {renderIntroduction}

      <div ref={mainRef} className={clsx(cx["proxy-last-section"])} />
      <div
        className={clsx(cx["main-section"], {
          "!opacity-100 !pointer-events-auto !visible": mainInview,
        })}
      >
        <div className={cx["main-section__wrapper"]}>
          <motion.div
            className={cx["details-container"]}
            initial={{ y: "calc(50vh - 83px)", opacity: 0 }}
            variants={variants}
            animate={hasVisited ? "detailsContainer" : ""}
          >
            <motion.nav
              initial={{ color: "#191919", width: 100, paddingInline: 0 }}
              className="w-fit mx-auto pb-[10px] flex justify-between"
              variants={variants}
              animate={hasVisited ? "navBar" : ""}
            >
              <motion.button
                initial={{ background: "transparent" }}
                variants={variants}
                animate={hasVisited ? "navLogo" : ""}
                className={cx["logo"]}
              >
                JM
              </motion.button>
              <div className="gap-10 grid grid-flow-col ">
                {NAVITEMS.map((item) => {
                  return (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0 }}
                      animate={hasVisited ? "navButton" : ""}
                      variants={variants}
                      onClick={() => setCurrentPage(item.key)}
                      className={clsx(
                        "text-[#a9a9a9] transition-colors duration-300 w-[5.5rem]",
                        {
                          "!text-white": item.key === currentPage,
                        }
                      )}
                    >
                      {item.label}
                      <div
                        className={clsx(
                          "border-b border-b-white h-[0.375rem] w-0 transition-[width] duration-300",
                          { "!w-full": item.key === currentPage }
                        )}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
            <motion.div
              className={cx["content"]}
              initial={{ height: "0", paddingBlock: 0 }}
              variants={variants}
              animate={hasVisited ? "content" : ""}
            >
              <div
                ref={contentRef}
                key={currentPage}
                className={cx["content-wrapper"]}
              >
                {NAVITEMS.find((item) => item.key === currentPage)?.component}
              </div>
            </motion.div>
            <footer className="pb-8">
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
        </div>
      </div>
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
    url: "https://www.instagram.com/jmmmmm_07/",
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
