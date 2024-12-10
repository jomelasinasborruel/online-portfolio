import { HTMLMotionProps, UseInViewOptions, useInView } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";

type lol = {
  ss: string;
} & HTMLMotionProps<"div">;
const MotionInview = (
  props: {
    inviewOptions?: UseInViewOptions;
  } & HTMLMotionProps<"div">,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, props.inviewOptions);

  return (
    <motion.div ref={ref} {...props} animate={isInView ? props?.animate : {}}>
      {props.children}
    </motion.div>
  );
};

export default MotionInview;
