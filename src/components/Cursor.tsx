'use client';

import { useCallback, useEffect, useRef, useState } from "react";

type MouseEvent = globalThis.MouseEvent;

const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const dotOutline = useRef<HTMLDivElement>(null);
  const [mouseActive, setMouseActive] = useState(false);

  const delay = 8;
  const _x = useRef(0);
  const _y = useRef(0);
  const endX = useRef(0);
  const endY = useRef(0);

  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);
  const requestRef = useRef<number | null>(null);

  // CSS inline para o cursor seguindo o padrão antigo
  const cursorStyles = `
    @media (min-width: 768px) {
      .cursor-dot,
      .cursor-dot-outline {
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        opacity: 0;
        z-index: 9222;
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease-in-out, transform 0.5s ease-in-out;
      }

      .cursor-dot {
        width: 8px;
        height: 8px;
        box-shadow: inset 0 0 0px 0.5px #d1d5db;
        background-color: #9ca3af;
      }

      .cursor-dot-outline {
        width: 50px;
        height: 50px;
        border: 1px solid #9ca3af;
        box-shadow: inset 0 0 0px 0.5px #d1d5db;
      }

      .cursor-inactive .cursor-dot {
        box-shadow: none;
        background-color: transparent;
      }

      .cursor-inactive .cursor-dot-outline {
        box-shadow: none;
        transform: translate(-50%, -50%) scale(0);
      }

      .cursor-active .cursor-dot {
        transform: translate(-50%, -50%) scale(1);
      }
      
      .cursor-active .cursor-dot-outline {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;

  const toggleCursorVisibility = useCallback(() => {
    if (dot?.current && dotOutline?.current)
      if (cursorVisible.current) {
        dot.current.style.opacity = "1";
        dotOutline.current.style.opacity = "1";
      } else {
        dot.current.style.opacity = "0";
        dotOutline.current.style.opacity = "0";
      }
  }, []);

  const toggleCursorSize = useCallback(() => {
    if (cursorEnlarged.current) {
      setMouseActive(true);
    } else {
      setMouseActive(false);
    }
  }, []);

  const mouseOverEvent = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.dataset.hover) {
        cursorEnlarged.current = true;
        toggleCursorSize();
      }
    },
    [toggleCursorSize]
  );

  const mouseOutEvent = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.dataset.hover) {
        cursorEnlarged.current = false;
        toggleCursorSize();
      }
    },
    [toggleCursorSize]
  );

  const mouseEnterEvent = useCallback(() => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  }, [toggleCursorVisibility]);

  const mouseLeaveEvent = useCallback(() => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  }, [toggleCursorVisibility]);

  const mouseMoveEvent = useCallback(
    (e: MouseEvent) => {
      cursorVisible.current = true;
      toggleCursorVisibility();

      endX.current = e.pageX;
      endY.current = e.pageY;
      if (dot?.current) {
        dot.current.style.top = endY.current + "px";
        dot.current.style.left = endX.current + "px";
      }
    },
    [toggleCursorVisibility]
  );

  const animateDotOutline = useCallback(() => {
    _x.current += (endX.current - _x.current) / delay;
    _y.current += (endY.current - _y.current) / delay;

    if (dotOutline?.current) {
      dotOutline.current.style.top = _y.current + "px";
      dotOutline.current.style.left = _x.current + "px";
    }

    requestRef.current = requestAnimationFrame(animateDotOutline);
  }, []);

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === "undefined") return;

    // Verificar se é desktop
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    // Inicializar posição do cursor
    endX.current = window.innerWidth / 2;
    endY.current = window.innerHeight / 2;

    const requestRefs = requestRef?.current;

    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
    document.addEventListener("mouseover", mouseOverEvent);
    document.addEventListener("mouseout", mouseOutEvent);

    animateDotOutline();

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
      document.removeEventListener("mouseover", mouseOverEvent);
      document.removeEventListener("mouseout", mouseOutEvent);

      if (requestRefs) {
        cancelAnimationFrame(requestRefs);
      }
    };
  }, [
    mouseMoveEvent,
    mouseEnterEvent,
    mouseLeaveEvent,
    mouseOverEvent,
    mouseOutEvent,
    animateDotOutline,
  ]);

  // Não renderizar em mobile ou durante SSR
  if (typeof window === "undefined" || window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <style jsx>{cursorStyles}</style>
      <div className={`cursor-container ${mouseActive ? "cursor-active" : "cursor-inactive"}`}>
        <div ref={dotOutline} className="cursor-dot-outline"></div>
        <div ref={dot} className="cursor-dot"></div>
      </div>
    </>
  );
};

export default Cursor;