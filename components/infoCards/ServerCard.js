export default function ServerCard({ children }) {
  return (
    <div className="rounded-lg px-4 py-2.5 flex items-center text-sm"
         style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.25)" }}>
      {children}
    </div>
  );
}
