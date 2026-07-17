import Link from "next/link";
import "./NavBar.css"

export default function NavBar() {
  return (
    <nav className="px-4 pt-4 pb-2">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-2xl p-1.5">
          <div className="flex gap-2">
            <Link
              href="/gruby"
              className="nav-link flex-1 flex items-center justify-center py-3
                         rounded-xl text-sm font-medium tracking-wide"
            >
              <span className="mr-2">🐱</span> Gruby
            </Link>

            <Link
              href="/tic-tac-toe"
              className="nav-link flex-1 flex items-center justify-center py-3
                         rounded-xl text-sm font-medium tracking-wide"
            >
              <span className="mr-2">⊞</span> Tic-Tac-Toe
            </Link>

            <Link
              href="/tic-tac-toe-3d"
              className="nav-link flex-1 flex items-center justify-center py-3
                         rounded-xl text-sm font-medium tracking-wide"
            >
              <span className="mr-2">🧊</span> 3D TTT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
