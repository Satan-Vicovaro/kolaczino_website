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
        <HeartFilledIcon className="w-14 h-14 text-red-500" />
      ) : (
        <HeartIcon className="w-14 h-14 text-gray-500" />
      )}

      {clicked && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 flex items-center justify-center cursor-not-allowed">
            {children}
          </div>
        </div>
      )}
    </button>
  );
}
