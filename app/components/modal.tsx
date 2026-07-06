"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

export const ModalOverlay = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-40 flex justify-center w-full h-full px-8 pt-24 transition-all duration-300 ease-in-out xl:bg-transparent bg-black/70"
      onClick={() => push("/")}
    >
      <Modal>{children}</Modal>
    </div>
  );
};

export const Modal = ({ children }: { children: ReactNode }) => (
  <div
    id="modal"
    className="z-50 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-min"
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);
