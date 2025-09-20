
export default function ErrorCard({ text = "" }) {
  return (
    <div className="rounded-full px-3 py-1 flex items-center w-max justify-center"
      style={{ backgroundColor: "var(--red-6)", color: "var(--white-6)" }}
    >
      {text}
    </div>)
}
