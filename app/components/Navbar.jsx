"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold">
        Realtime Feed
      </h1>

      <div className="flex gap-6">
        <Link
          href="/"
          className={`hover:text-gray-300 ${
            pathname === "/" ? "text-yellow-400" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/admin"
          className={`hover:text-gray-300 ${
            pathname === "/admin" ? "text-yellow-400" : ""
          }`}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;