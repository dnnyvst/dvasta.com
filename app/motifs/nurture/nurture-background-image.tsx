/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { useTheme } from "next-themes";
import { PiLineVerticalLight } from "react-icons/pi";

import imageMetadata from "./image-metadata.json" with { type: "json" };

const HORIZONTAL_IMAGES: string[] = [
  "1093",
  "2111",
  "2235",
  "7549",
  "7624",
  "8126",
  "8288",
];

const VERTICAL_IMAGES: string[] = [
  "0391",
  "1028",
  "8119",
  "8165",
  "8175",
  "8193",
  "8287",
  "1665",
  "1689",
];

const HORIZONTAL_POSITION =
  "bg-center absolute right-0 top-[45vh] bottom-[20vh] w-[clamp(58vw,75vw,900px)] bg-no-repeat bg-cover overflow-x-clip";
const VERTICAL_POSITION =
  "bg-top-left absolute right-[5vw] top-[35vh] h-[65vh] w-[clamp(55vw,70vw,600px)] bg-no-repeat bg-cover md:right-[12vw] md:left-[45vw] md:bottom-0 md:top-[35vh] md:h-auto md:w-auto";

const getImageUrl = (imageNumber: string, orientation: string): string =>
  `/cameraroll/${orientation}/IMG_${imageNumber}.webp`;

type ImageMetadata = {
  date: {
    coords: {
      lat: {
        d: string;
        m: string;
        s: string;
        direction: string;
      };
      long: {
        d: string;
        m: string;
        s: string;
        direction: string;
      };
    };
  };
  meteringMode: string;
  fNumber: string;
  exposureTime: string;
  colorSpace: string;
  colorProfile: string;
  focalLength: string;
};

const getMetadata = (image: string): ImageMetadata =>
  (imageMetadata as Record<string, ImageMetadata>)[image];

interface DateCoordProps {
  d: string;
  m: string;
  s: string;
  direction: string;
}
const DateCoord: FC<DateCoordProps> = ({ d, m, s, direction }) => {
  return (
    <span className="flex gap-0 sm:gap-1">
      {d}° {m}&apos; {s}&quot;<span className="italic">({direction})</span>
    </span>
  );
};

const SplitHorizontalImage = ({ image }: { image: string }) => {
  const url = getImageUrl(image, "horizontal");
  const metadata = getMetadata(image);

  return (
    <div
      className={HORIZONTAL_POSITION}
      style={{ backgroundImage: `url("${url}")` }}
    >
      <div className="absolute w-[23%] h-full bg-background ml-[30%]" />
      {/* date coords */}
      <span className="text-sm relative left-[53%] flex flex-col-reverse md:flex-row-reverse md:justify-end md:items-center gap-0 md:gap-1 top-76 opacity-70">
        <span className="flex gap-0 md:gap-1">
          <PiLineVerticalLight
            size={20}
            className="-mx-2.25 mr-2.75 md:mr-0 md:mx-auto"
          />
          <DateCoord {...metadata.date.coords.long} />
          <PiLineVerticalLight size={20} />
        </span>
        <span className="flex items-center gap-0 md:gap-1">
          <PiLineVerticalLight className="-mx-2.25" size={20} />
          <PiLineVerticalLight size={20} />
          <DateCoord {...metadata.date.coords.lat} />
        </span>
      </span>
      {/* other meta */}
      <div className="whitespace-nowrap relative left-[53%] flex flex-col font-sans text-xs font-light bottom-18 md:bottom-13">
        <span className="relative flex gap-1 md:flex-row md:items-center md:gap-1 opacity-70">
          <span className="hidden gap-1 sm:flex">
            Color space: <ImageValue>{metadata.colorSpace}</ImageValue>
            Color profile: <ImageValue>{metadata.colorProfile}</ImageValue>
          </span>
          Focal length: <ImageValue>{metadata.focalLength}</ImageValue>
        </span>
        <span className="relative flex gap-1 md:flex-row md:items-center md:gap-1 opacity-70">
          <span className="hidden gap-1 sm:flex">
            Metering mode: <ImageValue>{metadata.meteringMode}</ImageValue>
          </span>
          F number: <ImageValue>{metadata.fNumber}</ImageValue>
          Exposure time: <ImageValue>{metadata.exposureTime}</ImageValue>
        </span>
      </div>
    </div>
  );
};

const VerticalImage = ({ image }: { image: string }) => {
  const url = getImageUrl(image, "vertical");
  const metadata = getMetadata(image);

  return (
    <div
      className={VERTICAL_POSITION}
      style={{ backgroundImage: `url("${url}")` }}
    >
      {/* date coords */}
      <span className="absolute left-0 flex items-center gap-0 text-sm whitespace-nowrap sm:gap-2 -top-6 opacity-70">
        <PiLineVerticalLight className="-mx-2" size={20} />
        <PiLineVerticalLight size={20} />
        <DateCoord {...metadata.date.coords.lat} />
        <PiLineVerticalLight size={20} />
        <DateCoord {...metadata.date.coords.long} />
        <PiLineVerticalLight size={20} />
      </span>

      {/* other meta */}
      <div className="[writing-mode:vertical-rl] -right-4 sm:gap-0 gap-1 sm:-right-8 absolute top-0 flex sm:flex-col font-sans text-xs font-light whitespace-nowrap">
        <span className="relative flex gap-1 md:flex-row md:items-center md:gap-1 opacity-70">
          Color space: <ImageValue>{metadata.colorSpace}</ImageValue>
          Color profile: <ImageValue>{metadata.colorProfile}</ImageValue>
          Focal length: <ImageValue>{metadata.focalLength}</ImageValue>
        </span>
        <span className="relative flex gap-1 md:flex-row md:items-center md:gap-1 opacity-70">
          Metering mode: <ImageValue>{metadata.meteringMode}</ImageValue>F
          number: <ImageValue>{metadata.fNumber}</ImageValue>
          Exposure time: <ImageValue>{metadata.exposureTime}</ImageValue>
        </span>
      </div>
    </div>
  );
};

const getRandomImage = (orientation: string, currentImage: string) => {
  const availableHorizontalImages = HORIZONTAL_IMAGES.filter(
    (img) => img !== currentImage,
  );
  const availableVerticalImages = VERTICAL_IMAGES.filter(
    (img) => img !== currentImage,
  );
  const maxLength =
    orientation === "horizontal"
      ? availableHorizontalImages.length
      : availableVerticalImages.length;
  const index = Math.floor(Math.random() * maxLength);

  return orientation === "horizontal"
    ? availableHorizontalImages[index]
    : availableVerticalImages[index];
};

type ImageOrientation = "horizontal" | "vertical";

interface ImageProps {
  image: string;
}

const ImageValue = ({ children }: { children: React.ReactNode }) => (
  <span className="italic font-iwata">{children}.</span>
);

export const NurtureBackgroundImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<string>(() =>
    Math.random() < 0.5 ? "horizontal" : "vertical",
  );

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    const changeImage = () => {
      const newOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      setOrientation(newOrientation);
      setImage(getRandomImage(newOrientation, image));
    };
    const imageRotation = setTimeout(changeImage, !mounted ? 0 : 8000);

    return () => clearTimeout(imageRotation);
  }, [image, mounted]);

  if (!mounted || !resolvedTheme?.includes("nurture") || !image) return null;

  return (
    <>
      {orientation === "horizontal" ? (
        <SplitHorizontalImage image={image} />
      ) : (
        <VerticalImage image={image} />
      )}
    </>
  );
};
