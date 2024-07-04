import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center bg-gray-100 p-7 rounded-lg shadow-lg">
        Welcome to my website
      </h1>
    </div>
  );
}
