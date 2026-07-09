const HORIZONTAL_POSITION =
  "bg-center absolute right-[0vw] left-[42vw] top-[45vh] bottom-[20vh] bg-no-repeat bg-cover";

const VERTICAL_POSITION =
  "bg-bottom-left absolute right-[20vw] left-[45vw] top-[45vh] bottom-[-5vh] bg-no-repeat bg-cover";

const HORIZONTAL_IMAGES: string[] = [
  "https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg",
];

const VERTICAL_IMAGES: string[] = [
  "https://t3.ftcdn.net/jpg/03/56/65/84/360_F_356658435_0RmzeYwPk0NwdHPXSHM4CSMbevQ493v0.jpg",
];

const SplitHorizontalImage = ({ url }: { url: string }) => (
  <div className={`${HORIZONTAL_POSITION} bg-[url(${url})]`}>
    <div className="absolute w-[25%] h-full bg-background ml-[32%]" />
  </div>
);

export const NurtureBackgroundImage = () => {
  // todo
  // pick random images

  return (
    <>
      <SplitHorizontalImage url={HORIZONTAL_IMAGES[0]} />
    </>
  );
};
