/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const HORIZONTAL_POSITION =
  "bg-center absolute right-[0vw] left-[42vw] top-[45vh] bottom-[20vh] bg-no-repeat bg-cover";

const VERTICAL_POSITION =
  "bg-top-left absolute right-[20vw] left-[45vw] top-[35vh] bottom-[0vh] bg-no-repeat bg-cover";

const HORIZONTAL_IMAGES: string[] = [
  "https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg",
];

const VERTICAL_IMAGES: string[] = [
  "https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg",
];

const SplitHorizontalImage = ({ url }: { url: string }) => (
  <div className={`${HORIZONTAL_POSITION} bg-[url(${url})]`}>
    <div className="absolute w-[23%] h-full bg-background ml-[30%]" />
  </div>
);

const VerticalImage = ({ url }: { url: string }) => (
  <div className={`${VERTICAL_POSITION} bg-[url(${url})]`}>
    {/* <div className="absolute w-[25%] h-full bg-background ml-[30%]" /> */}
  </div>
);

const getImageIndex = (orientation: string) => {
  const maxLength =
    orientation === "horizontal"
      ? HORIZONTAL_IMAGES.length
      : VERTICAL_IMAGES.length;

  return Math.floor(Math.random() * maxLength);
};

export const NurtureBackgroundImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<string>(() =>
    Math.random() < 0.6 ? "horizontal" : "vertical",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOrientation(() => (Math.random() < 0.6 ? "horizontal" : "vertical"));
  }, [resolvedTheme]);

  // todo
  // pick random images

  if (!mounted || !resolvedTheme?.includes("nurture")) return null;

  return (
    <>
      {orientation === "horizontal" ? (
        <SplitHorizontalImage
          url={HORIZONTAL_IMAGES[getImageIndex(orientation)]}
        />
      ) : (
        <VerticalImage url={VERTICAL_IMAGES[getImageIndex(orientation)]} />
      )}
    </>
  );
};
