import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"

export default function HeartButton({ onClick, disabled = false, children, clicked = false }) {

  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="relative transition-transform hover:scale-130 content-center align-middle"
      disabled={disabled}
    >
      {clicked ? (
        <HeartFilledIcon className="w-8 h-8 text-red-500" />
      ) : (
        <HeartIcon className="w-8 h-8 text-gray-500" />
      )}

      {clicked && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="border-2 border-red-500 w-40 h-40 flex items-center justify-center">
            {children}
          </div>
        </div>
      )}
    </button>
  );
}
