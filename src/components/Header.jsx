"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 bg-white">
      <header className="text-gray-600 body-font glass">
        <div className="container mx-auto flex p-3 items-center justify-between lg:w-[1000px] md:w-[724px] sm:w-[675px] max-w-full">
          <Link
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium text-gray-900 items-center lg:justify-center md:mb-0"
            href="/"
          >
            <Image
              src="https://kobakoo.com/logo.svg"
              width={45}
              height={20}
              alt="logo"
              className="m-0.5 w-10 h-6 rounded-none"
            ></Image>
            <span className="ml-3 text-xl items-center no-underline max-md:font-bold">
              The Blog
            </span>
          </Link>
          <nav className="sm:flex flex-wrap items-center text-base md:ml-auto hidden">
            <Link
              className="mr-5 hover:text-blue-600 text-black transition"
              href="/cat/tech"
            >
              Tech
            </Link>
            <Link
              className="mr-5 hover:text-blue-600 text-black transition"
              href="/cat/design"
            >
              Design
            </Link>
            <Link
              className="mr-5 hover:text-blue-600 text-black transition"
              href="/cat/news"
            >
              News
            </Link>
            <Link
              className="hover:text-blue-600 text-black transition"
              href="/cat/others"
            >
              Others
            </Link>
          </nav>
          {/* <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button
              className="btn btn-outline md:mt-0 mt-5"
              onClick={() => {
                let newwin = window.open("https://kobakoo.com");
              }}
            >
              Homepage
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="w-4 h-4 ml-1"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </button>
          </div> */}
        </div>
      </header>
    </div>
  );
}

export default Header;
