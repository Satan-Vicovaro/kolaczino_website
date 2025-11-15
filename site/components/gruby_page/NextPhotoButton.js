import { useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export default function NextPhotoButton({ onClick = () => { }, disabled = false, children, clicked = false }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="flex items-center justify-center bg-orange-10 h-8 w-24
                  border border-white/20 rounded-6 hover:bg-white/10
                  transition md:h-12 md:w-36 md:ml-8"
      disabled={disabled}
    >
      <div className="relative transition-transform hover:scale-130 content-center align-middle">
        {!clicked && <ChevronRightIcon className="text-white w-6 h-6" />}
        {clicked && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 flex items-center justify-center">
              {children}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
