import { useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export default function NextPhotoButton({ onClick = () => { }, disabled = false, children }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      onClick={() => {
        setClicked(!clicked);
        onClick();
      }}
      size="4" style={{ width: "150px" }}
      className="flex items-center justify-center border border-white/20 rounded-lg hover:bg-white/10 transition"
      disabled={disabled}
    >
      <div className="relative transition-transform hover:scale-130 content-center align-middle">
        <ChevronRightIcon className="text-white w-6 h-6" />
        {clicked && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="border-2 border-red-500 w-40 h-40 flex items-center justify-center">
              {children}
            </div>
          </div>
        )}
      </div>
    </Button>
  );
}
