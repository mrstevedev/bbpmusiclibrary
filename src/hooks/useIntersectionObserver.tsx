import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (data) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );
    const ref = observerRef.current;

    if (ref) {
      observer.observe(ref);
      return () => {
        if (ref) observer.unobserve(ref);
      };
    }
  }, [data]);

  return { isIntersecting, observerRef };
};
