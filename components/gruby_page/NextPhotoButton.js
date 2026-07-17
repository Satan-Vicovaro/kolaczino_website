import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function NextPhotoButton({ onClick = () => {}, disabled = false, children, clicked = false }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-10 w-28 md:h-12 md:w-36
                 rounded-xl font-medium text-sm transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: disabled ? "var(--gray-5)" : "var(--orange-9)",
        color: "white",
        border: "none",
      }}
      disabled={disabled}
    >
      <div className="relative flex items-center justify-center">
        {!clicked && (
          <span className="flex items-center gap-1">
            Next <ChevronRightIcon className="w-5 h-5" />
          </span>
        )}
        {clicked && (
          <div className="flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </button>
  );
}
