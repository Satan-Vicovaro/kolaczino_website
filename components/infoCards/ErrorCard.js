import { Cross2Icon } from "@radix-ui/react-icons";

export default function ErrorCard({ children, onCloseButtonClick = () => {} }) {
  return (
    <div className="rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm"
         style={{ background: "rgba(229, 72, 77, 0.15)", color: "#f87171", border: "1px solid rgba(229, 72, 77, 0.25)" }}>
      <span className="flex-1">{children}</span>
      <button
        className="p-0.5 rounded hover:bg-white/10 transition-colors"
        onClick={onCloseButtonClick}
      >
        <Cross2Icon className="w-4 h-4" />
      </button>
    </div>
  );
}
