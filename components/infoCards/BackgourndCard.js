export default function BackgroundCard({ width = "", height = "", children }) {
  return (
    <div className="rounded-md border shadow-2xl p-6 flex items-center w-max h-max justify-center"
      style={{ backgroundColor: "var(--gray-4)", borderColor: "var(--gray-6)", width: width, height: height }}
    >
      {children}
    </div>)
}
