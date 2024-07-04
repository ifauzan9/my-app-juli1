import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-500 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Navbar</h1>
        <ul className="hidden md:flex items-center gap-3">
          <li
            className="text-white px-2 py-1 cursor-pointer hover:text-gray-300"
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li
            className="text-white px-2 py-1 cursor-pointer hover:text-gray-300"
            onClick={() => router.push("/students")}
          >
            Students
          </li>
          <li
            className="text-white px-2 py-1 cursor-pointer hover:text-gray-300"
            onClick={() => router.push("/about")}
          >
            About
          </li>
        </ul>
        <div className="md:hidden flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Menu"
          >
            <i className="bx bx-menu text-5xl"></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col gap-3">
            <li
              className="block text-white px-2 py-1 cursor-pointer hover:text-gray-300"
              onClick={() => router.push("/")}
            >
              Home
            </li>
            <li
              className="block text-white px-2 py-1 cursor-pointer hover:text-gray-300"
              onClick={() => router.push("/students")}
            >
              Students
            </li>
            <li
              className="block text-white px-2 py-1 cursor-pointer hover:text-gray-300"
              onClick={() => router.push("/about")}
            >
              About
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
