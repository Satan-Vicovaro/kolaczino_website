import { Cross2Icon } from "@radix-ui/react-icons";

export default function ErrorCard({ children, onCloseButtonClick = () => { } }) {
  return (
    <div className="rounded-full px-3 py-1 flex items-center w-max justify-center align-middle"
      style={{ backgroundColor: "var(--red-6)", color: "var(--white-6)" }}
    >
      {children}
      <button
        className="white-700 hover:text-black font-bold  ml-2 m-1"
        onClick={
          () => { onCloseButtonClick() }
        }
      > <Cross2Icon className="w-5 h-5" /> </button>
    </div>)
}
