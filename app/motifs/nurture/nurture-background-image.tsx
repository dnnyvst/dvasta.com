/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, type FC } from "react";
import { useTheme } from "next-themes";
import { PiLineVerticalLight } from "react-icons/pi";

const HORIZONTAL_POSITION =
  "bg-center absolute right-0 top-[45vh] bottom-[20vh] w-[clamp(58vw,75vw,900px)] bg-no-repeat bg-cover";
const VERTICAL_POSITION =
  "bg-top-left absolute right-[5vw] top-[35vh] h-[65vh] w-[clamp(55vw,70vw,600px)] bg-no-repeat bg-cover md:right-[12vw] md:left-[45vw] md:bottom-0 md:top-[35vh] md:h-auto md:w-auto";

import imageMetadata from "./image-metadata.json" with { type: "json" };

const getImageUrl = (imageNumber: string, orientation: string): string =>
  `/cameraroll/${orientation}/IMG_${imageNumber}.webp`;

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
  const metadata = (imageMetadata as unknown as Record<string, ImageMetadata>)[
    image
  ];
  console.log(metadata);
  return (
    <div
      className={HORIZONTAL_POSITION}
      style={{ backgroundImage: `url("${url}")` }}
    >
      <div className="absolute w-[23%] h-full bg-background ml-[30%]" />
      {/* date coords */}
      <span className="text-sm relative right-[-53%] flex flex-col md:flex-row md:items-center gap-0 md:gap-1 top-76 opacity-70">
        <span className="flex items-center gap-0 md:gap-1">
          <PiLineVerticalLight className="-mx-2.25" size={20} />
          <PiLineVerticalLight size={20} />
          <DateCoord {...metadata.date.coords.lat} />
        </span>
        <span className="flex gap-0 md:gap-1">
          <PiLineVerticalLight
            size={20}
            className="-mx-2.5 mr-2.5 md:mr-0 md:mx-auto"
          />
          <DateCoord {...metadata.date.coords.long} />
          <PiLineVerticalLight size={20} />
        </span>
      </span>
      <div className="relative flex flex-col font-sans font-light bottom-13">
        <span className="text-xs relative right-[-53%] flex flex-col md:flex-row md:items-center gap-0 md:gap-1 opacity-70">
          Color space:{" "}
          <span className="italic font-iwata">{metadata.colorSpace}.</span>
          Color profile:{" "}
          <span className="italic font-iwata">{metadata.colorProfile}.</span>
          Focal length:{" "}
          <span className="italic font-iwata">{metadata.focalLength}.</span>
        </span>
        <span className="text-xs relative right-[-53%] flex flex-col md:flex-row md:items-center gap-0 md:gap-1 opacity-70">
          Metering mode:{" "}
          <span className="italic font-iwata">{metadata.meteringMode}.</span>F
          number: <span className="italic font-iwata">{metadata.fNumber}.</span>
          Exposure time:{" "}
          <span className="italic font-iwata">{metadata.exposureTime}.</span>
        </span>
      </div>
    </div>
  );
};

const VerticalImage = ({ image }: { image: string }) => {
  const url = getImageUrl(image, "vertical");
  const metadata = (imageMetadata as unknown as Record<string, ImageMetadata>)[
    image
  ];

  return (
    <div
      className={VERTICAL_POSITION}
      style={{ backgroundImage: `url("${url}")` }}
    >
      {/* date coords */}
      <span className="relative left-0 flex items-center gap-0 text-sm whitespace-nowrap sm:gap-2 -top-6 opacity-70">
        <PiLineVerticalLight className="-mx-2" size={20} />
        <PiLineVerticalLight size={20} />
        <DateCoord {...metadata.date.coords.lat} />
        <PiLineVerticalLight size={20} />
        <DateCoord {...metadata.date.coords.long} />
        <PiLineVerticalLight size={20} />
      </span>
    </div>
  );
};

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
        <SplitHorizontalImage image={image} />
      ) : (
        <VerticalImage image={image} />
      )}
    </>
  );
};
