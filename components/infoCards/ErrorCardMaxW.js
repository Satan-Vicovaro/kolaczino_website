export default function ErrorCardMaxW({ children }) {
  return (
    <div className="rounded-full px-3 py-1 flex items-center w-full justify-center"
      style={{ backgroundColor: "var(--red-6)", color: "var(--white-6)" }}
    >
      {children}
    </div>)
}
