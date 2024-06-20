import React, { useEffect, useCallback, useRef } from "react";
import { useMotionValue } from "framer-motion";

interface BorderRadii {
  scaleX: any;
  scaleY: any;
  borderRadius: any;
}

export function useInvertedBorderRadius(radius: number): BorderRadii {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  const borderRadius = useRef(useMotionValue(`${radius}px ${radius}px`)); // Initial value as a ref

  const updateRadius = useCallback(() => {
    const latestX = scaleX.get();
    const latestY = scaleY.get();
    const xRadius = latestX * radius + "px";
    const yRadius = latestY * radius + "px";

    borderRadius.current.set(`${xRadius} ${yRadius}`);
  }, [scaleX, scaleY, radius]);

  useEffect(() => {
    updateRadius(); // Call updateRadius initially
  }, [updateRadius]);

  useEffect(() => {
    const unsubscribeX = scaleX.on("change", updateRadius);
    const unsubscribeY = scaleY.on("change", updateRadius);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [scaleX, scaleY, updateRadius]);

  useEffect(() => {
    return () => {
      borderRadius.current.set(`${radius}px ${radius}px`); // Reset border radius on unmount
    };
  }, [radius]);

  return {
    scaleX,
    scaleY,
    borderRadius: borderRadius.current, // Return the current motion value
  };
}
