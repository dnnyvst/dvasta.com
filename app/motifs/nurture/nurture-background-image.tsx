/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const HORIZONTAL_POSITION =
  "bg-center absolute right-0 top-[45vh] bottom-[20vh] w-[clamp(58vw,75vw,900px)] bg-no-repeat bg-cover";
const VERTICAL_POSITION =
  "bg-top-left absolute right-[5vw] top-[35vh] h-[65vh] w-[clamp(55vw,70vw,600px)] bg-no-repeat bg-cover md:right-[20vw] md:left-[45vw] md:bottom-0 md:top-[35vh] md:h-auto md:w-auto";

const getImageUrls = (imgNumbers: string[], orientation: string): string[] =>
  imgNumbers.map((number) => `/cameraroll/${orientation}/IMG_${number}.webp`);

const HORIZONTAL_IMAGES: string[] = getImageUrls(
  ["1093", "2111", "2235", "7549", "7624", "8126", "8288"],
  "horizontal",
);

const VERTICAL_IMAGES: string[] = getImageUrls(
  ["0391", "1028", "8119", "8165", "8175", "8193", "8287", "1665", "1689"],
  "vertical",
);

const SplitHorizontalImage = ({ url }: { url: string }) => (
  <div
    className={HORIZONTAL_POSITION}
    style={{ backgroundImage: `url("${url}")` }}
  >
    <div className="absolute w-[23%] h-full bg-background ml-[30%]" />
  </div>
);

const VerticalImage = ({ url }: { url: string }) => (
  <div
    className={VERTICAL_POSITION}
    style={{ backgroundImage: `url("${url}")` }}
  />
);

const getRandomImage = (orientation: string) => {
  const maxLength =
    orientation === "horizontal"
      ? HORIZONTAL_IMAGES.length
      : VERTICAL_IMAGES.length;
  const index = Math.floor(Math.random() * maxLength);

  return orientation === "horizontal"
    ? HORIZONTAL_IMAGES[index]
    : VERTICAL_IMAGES[index];
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

  if (!mounted || !resolvedTheme?.includes("nurture")) return null;

  const image = getRandomImage(orientation);

  return (
    <>
      {orientation === "horizontal" ? (
        <SplitHorizontalImage url={image} />
      ) : (
        <VerticalImage url={image} />
      )}
    </>
  );
};
