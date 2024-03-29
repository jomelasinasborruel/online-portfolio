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

const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSectionRef, videoSectionInviewRef] = useInView();
  const loadingProgress = useProgress();
  const [hasVisited, setHadVisited] = useState(false);
  const asdRef = useRef<HTMLDivElement>(null);
  const [mainRef, mainInview] = useInView({
    threshold: 1,
  });

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
  console.log(asdRef.current?.clientHeight);
  useEffect(() => {
    window.addEventListener("scroll", handleScoll);
    setScrollTop(0.314 * (window.scrollY / 100));
    scrollTo({ top: 0 });

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
      height: `${asdRef.current?.clientHeight ?? 0}px`,
      transition: {
        delay: 3,
        duration: 1.5,
        type: "spring",
        ease: "0.550, 0.085, 0.680, 0.530",
      },
    },
  };

  return (
    <main className={clsx(cx["main"])}>
      {renderIntroduction}

      <div ref={mainRef} className={clsx(cx["proxy-last-section"])}></div>
      <div
        className={clsx(cx["main-section"], {
          "!opacity-100 !pointer-events-auto !visible": mainInview,
        })}
      >
        <motion.div className={cx["main-section__wrapper"]}>
          <motion.div
            className={cx["details-container"]}
            initial={{ y: "calc(50vh - 83px)", opacity: 0 }}
            variants={variants}
            animate={hasVisited ? "detailsContainer" : ""}
          >
            <p className={cx["logo"]}>JM</p>

            <motion.div
              className={cx["content"]}
              initial={{ height: "0" }}
              variants={variants}
              animate={hasVisited ? "content" : ""}
            >
              <div ref={asdRef} className={cx["content-wrapper"]}>
                {["about-me", "projects", "my gallery", "tips"].map(
                  (title, index) => (
                    <div
                      key={index}
                      className="h-[31.25rem] border w-full border-[#191919] text-white  bg-black flex justify-center items-center"
                    >
                      <p className="font-earthOrbiter ">{title}</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
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
          </motion.div>
        </motion.div>
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
