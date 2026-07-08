import { useEffect, useRef } from "react";

export const useMouseListener = () => {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const touchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;

      const touch = event.touches[0];
      mouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return mouse;
};
