import { useEffect, useState } from "react";

export const useMouseListener = () => {
  // todo - use refs
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      setX((event.clientX / window.innerWidth) * 2 - 1);
      setY(-(event.clientY / window.innerHeight) * 2 + 1);
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

  return { x, y };
};
