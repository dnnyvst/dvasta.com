"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

export const ModalOverlay = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-40 flex justify-center w-full h-full pt-24"
      onClick={() => push("/")}
    >
      <Modal>{children}</Modal>
    </div>
  );
};

export const Modal = ({ children }: { children: ReactNode }) => (
  <div
    id="modal"
    className="z-50 w-3/4 lg:w-1/2 h-min"
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);
