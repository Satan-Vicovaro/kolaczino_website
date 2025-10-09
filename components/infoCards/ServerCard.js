export default function ServerCard({ children }) {
  return (
    <div className="rounded-full px-3 py-1 mt-4 flex items-center w-max justify-center"
      style={{ backgroundColor: "var(--blue-6)", color: "var(--white-6)" }}
    >
      {children}
    </div>)
}
