import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className="lg:w-[980px] w-full flex mx-auto">
      <div className="px-5 justify-center items-center lg:w-[980px] md:w-[692px] min-w-[335px] mx-auto">
        <div class="text-sm breadcrumbs my-5">
          <ul>
            <li>
              <Image
                src={"https://kobakoo.com/logo.svg"}
                width={15}
                height={10}
                alt="kbk logo"
                className="rounded-none"
              />
            </li>
            <li>Blog</li>
          </ul>
          <footer className="footer text-neutral-content min-w-full max-md:flex max-md:flex-wrap max-md:flex-row">
            <nav>
              <header className="footer-title text-black">Category</header>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="/cat/tech"
              >
                Technology
              </Link>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="/cat/design"
              >
                Design
              </Link>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="/cat/news"
              >
                News
              </Link>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="/cat/others"
              >
                Others
              </Link>
            </nav>
            <nav>
              <header className="footer-title text-black">Homepage</header>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="https://kobakoo.com"
                target="_blank"
              >
                Home
              </Link>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="https://kobakoo.com/about"
                target="_blank"
              >
                About us
              </Link>
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="https://kobakoo.com/contact"
                target="_blank"
              >
                Contact
              </Link>
            </nav>
            <nav>
              <header className="footer-title text-black">Legal</header>
              {/* <Link
              className="link link-hover text-black hover:text-blue-500"
              href=""
            >
              Terms of use
            </Link> */}
              <Link
                className="link link-hover text-black hover:text-blue-500"
                href="/policy"
              >
                Privacy policy
              </Link>
              {/* <Link
              className="link link-hover text-black hover:text-blue-500"
              href=""
            >
              Cookie policy
            </Link> */}
            </nav>
          </footer>
          <div className="w-full mt-6 pt-3 border-t-2 border-zinc-300">
            Copyright © 2023 Kobako Corp, All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
