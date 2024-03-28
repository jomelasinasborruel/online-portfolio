"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
// Components
import { Model } from "@/models/glasses";
import { Canvas } from "@react-three/fiber";
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

const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSectionRef, videoSectionInviewRef] = useInView();
  const loadingProgress = useProgress();
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
    if (window.scrollY > 1600 || window.scrollY < 0) return;
    setScrollTop(0.314 * (window.scrollY / 100));
  };

  // const renderGlassModel = (
  //   <React.Fragment>
  //     <Canvas
  //       id="glasses-canvas"
  //       className={clsx(cx["model-canvas"], {
  //         "!opacity-0": videoSectionInviewRef || mainInview,
  //       })}
  //     >
  //       <Suspense fallback={null}>
  //         <ambientLight />
  //         <Model scrollTop={scrollTop} />
  //       </Suspense>
  //     </Canvas>
  //   </React.Fragment>
  // );

  useEffect(() => {
    window.addEventListener("scroll", handleScoll);
    setScrollTop(0.314 * (window.scrollY / 100));
    scrollTo({ top: 0 });

    return () => window.removeEventListener("scroll", handleScoll);
  }, []);

  // Optimizes the loading
  if (loadingProgress.progress !== 100)
    return (
      <main
        className={clsx(cx["main"], {
          "max-h-screen overflow-hidden": loadingProgress.progress !== 100,
        })}
      >
        <div className="top-1/2 left-1/2 fixed -translate-y-1/2 -translate-x-1/2 z-50">
          <ReactLoading type="bubbles" delay={500} color="#a9a9a9" />
        </div>
      </main>
    );

  return (
    <main className={clsx(cx["main"])}>
      <div
        className={clsx(cx["introduction--container"], {
          "pointer-events-none": mainInview,
        })}
      >
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
            "!opacity-0": scrollY > 200,
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
      <div ref={mainRef} className={clsx(cx["proxy-last-section"])}></div>
      <div
        className={clsx(cx["main-section"], {
          "!opacity-100 !pointer-events-auto": mainInview,
        })}
      >
        <div className={cx["details-container"]}>
          <p className={cx["logo"]}>JM</p>
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
