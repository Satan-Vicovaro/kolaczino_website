import Link from "next/link";
import "./NavBar.css"

export default function NavBar() {
  return (
    <nav className="m-5 pt-1">
      <div className="max-w-4xl mx-auto">
        <div className=" BackGroundPanel rounded-lg shadow-sm p-2 bg-grayRadix-9"
        >
          <div className="grid grid-cols-2 gap-6 mx-6 my-3 auto-rows-[64px]">
            <Link
              href="/gruby"
              className="CardColor flex items-center justify-center w-full h-full 
                         rounded-md border bg-grayRadix-6 text-sm"
            >
              Gruby
            </Link>

            <Link
              href="/tic-tac-toe"
              className="CardColor flex items-center justify-center w-full h-full rounded-md border text-sm"
            >
              Fancy Tic-Tac-Toe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
