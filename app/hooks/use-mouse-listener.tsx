import { useEffect } from "react";

export const useMouseListener = () =>
  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      console.log(event.pageX, event.pageY);
    };
    const touchMove = (event: TouchEvent) => {
      console.log(event.touches[0].pageX, event.touches[0].pageY);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);
