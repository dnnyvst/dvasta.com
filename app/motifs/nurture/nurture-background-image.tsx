/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
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

const BASE_IMAGE = "absolute bg-center bg-no-repeat bg-cover";
const HORIZONTAL_POSITION = `${BASE_IMAGE} right-0 top-[45vh] bottom-[20vh] w-[clamp(58vw,75vw,900px)] overflow-x-clip`;
const VERTICAL_POSITION = `${BASE_IMAGE} right-[5vw] top-[35vh] bottom-0 w-[clamp(55vw,70vw,600px)] h-[65vh] md:left-[45vw] md:right-[12vw] md:top-[35vh] md:h-auto md:w-auto`;

type ImageOrientation = "horizontal" | "vertical";

const getImageUrl = (
  imageNumber: string,
  orientation: ImageOrientation,
): string => `/cameraroll/${orientation}/IMG_${imageNumber}.webp`;

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

interface BackgroundImageProps {
  className: string;
  url: string;
  children: ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({
  className,
  url,
  children,
}) => (
  <div className={className} style={{ backgroundImage: `url("${url}")` }}>
    {children}
  </div>
);

const ImageValue = ({ children }: { children: ReactNode }) => (
  <span className="italic font-iwata">{children}.</span>
);

interface ImageProps {
  image: string;
}

const SplitHorizontalImage: FC<ImageProps> = ({ image }) => {
  const url = getImageUrl(image, "horizontal");
  const metadata = getMetadata(image);

  return (
    <BackgroundImage className={HORIZONTAL_POSITION} url={url}>
      <div className="absolute w-[23%] h-full bg-background ml-[30%]" />
      {/* date coords */}
      <span className="text-sm absolute left-[53%] flex flex-col-reverse md:flex-row-reverse md:justify-end md:items-center gap-1 -bottom-11 md:-bottom-6 opacity-70 whitespace-nowrap">
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
      <div className="whitespace-nowrap relative left-[53%] flex flex-col font-sans text-xs font-light -top-8">
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
    </BackgroundImage>
  );
};

const VerticalImage: FC<ImageProps> = ({ image }) => {
  const url = getImageUrl(image, "vertical");
  const metadata = getMetadata(image);

  return (
    <BackgroundImage className={VERTICAL_POSITION} url={url}>
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
          Metering mode: <ImageValue>{metadata.meteringMode}</ImageValue> F
          number: <ImageValue>{metadata.fNumber}</ImageValue>
          Exposure time: <ImageValue>{metadata.exposureTime}</ImageValue>
        </span>
      </div>
    </BackgroundImage>
  );
};

const getRandomImage = (
  orientation: ImageOrientation,
  currentImage: string,
) => {
  const images =
    orientation === "horizontal" ? HORIZONTAL_IMAGES : VERTICAL_IMAGES;

  const availableImages = images.filter((img) => img !== currentImage);

  return availableImages[Math.floor(Math.random() * availableImages.length)];
};

export const NurtureBackgroundImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<ImageOrientation>(() =>
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

  return orientation === "horizontal" ? (
    <SplitHorizontalImage image={image} />
  ) : (
    <VerticalImage image={image} />
  );
};
