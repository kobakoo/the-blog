"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans" style={{ fontFamily: "SF Pro Text" }}>
      <div>
        <Header />
        <div></div>
        <div id="posts"></div>
      </div>
    </div>
  );
}
