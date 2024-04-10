"use client";
import ReactLenis from "@studio-freight/react-lenis";
import React, { ReactNode, useRef } from "react";
import { LenisOptions } from "@studio-freight/lenis";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
const SmoothScroll = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: LenisOptions;
}) => {
  // const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ReactLenis root {...options}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
