import { ThemeToggle } from "@/components";

export const Header = () => {
  return (
    <header className="relative sticky top-0 z-40 flex items-center w-full pt-4 bg-background">
      <span className="flex items-center gap-2 w-max">
        <h1>danny vasta</h1>
        {/* <h1 className="md:hidden">dv</h1> */}
      </span>
      {/* <span className="ml-auto">
        <ThemeToggle />
      </span> */}
    </header>
  );
};
