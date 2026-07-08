import { useEffect } from "react";

export const useMouseListener = () =>
  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      console.log(`x:${event.pageX}, y:${event.pageY}`);
      console.log("normalized:");
      // Convert to Normalized Device Coordinates (-1 to +1)
      console.log(
        `x:${(event.clientX / window.innerWidth) * 2 - 1}, y:${-(event.clientY / window.innerHeight) * 2 + 1}`,
      );
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
