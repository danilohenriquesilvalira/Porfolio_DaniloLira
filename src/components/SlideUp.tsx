'use client';

import { useEffect, useRef, useState } from "react";

interface SlideUpProps {
  children: React.ReactNode;
  offset?: string;
  classes?: string;
  onClick?: () => void;
  "data-hover"?: boolean;
  [key: string]: any;
}

const SlideUp = ({ 
  children, 
  offset = "-100px 0px -100px 0px", 
  classes = "", 
  onClick,
  "data-hover": dataHover,
  ...props 
}: SlideUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: offset,
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [offset]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${classes}`}
      onClick={onClick}
      data-hover={dataHover}
      {...props}
    >
      {children}
    </div>
  );
};

export default SlideUp;