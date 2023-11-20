"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useAmp } from "next/amp";
import {
  query,
  orderBy,
  limit,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, motion } from "framer-motion";

export default function Home() {
  const scrollRef = useRef(null);
  const [first, setFirst] = useState({});
  const [tops, setTops] = useState([]);
  const [seconds, setSeconds] = useState([]);
  const router = useRouter();
  const [topsOpen, setTopsOpen] = useState(false);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const firstPostQuery = query(postsRef, orderBy("date"), limit(1));
    getDocs(firstPostQuery).then((snapshot) => {
      let firstPost = {};
      snapshot.docs.forEach((doc) => {
        var json = doc.data();
        json.id = doc.id;
        firstPost = json;
        // console.log(doc.data());
        setFirst(firstPost);
        console.log(firstPost);
      });
    });
    const topPostQuery = query(postsRef, orderBy("date"), limit(5));
    getDocs(topPostQuery).then((snapshot) => {
      let topPosts = [];
      snapshot.docs.forEach((doc) => {
        var json = doc.data();
        json.id = doc.id;
        topPosts.push(json);
        // console.log(doc.data());
      });
      topPosts.shift();
      setTops(topPosts);
      console.log(topPosts);
    });

    const secondPostQuery = query(postsRef, orderBy("date"), limit(11));
    getDocs(secondPostQuery).then((snapshot) => {
      let secondPosts = [];
      snapshot.docs.forEach((doc) => {
        var json = doc.data();
        json.id = doc.id;
        secondPosts.push(json);
        // console.log(doc.data());
      });
      for (let step = 0; step < 5; step++) {
        secondPosts.shift();
      }
      setSeconds(secondPosts);
      console.log(secondPosts);
    });

    const otherPostQuery = query(postsRef, orderBy("date"), limit(19));
    getDocs(otherPostQuery).then((snapshot) => {
      let otherPosts = [];
      snapshot.docs.forEach((doc) => {
        var json = doc.data();
        json.id = doc.id;
        otherPosts.push(json);
        // console.log(doc.data());
      });
      for (let step = 0; step < 10; step++) {
        otherPosts.shift();
      }
      setOthers(otherPosts);
      console.log(otherPosts);
    });

    // console.log(firstPost.data);
  }, []);

  function dateChanger(dateString) {
    const date = new Date(dateString);
    const formatted = date
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .join("/");
    return formatted;
  }

  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, 1000);

  return (
    <div className="font-sans" style={{ fontFamily: "SF Pro Text" }}>
      <div className="bg-[#f5f5f7] min-h-screen">
        <Header />
        <div className="md:mx-0 md:w-auto w-[366px] mx-auto max-w-full">
          <h2 className="sm:mx-auto lg:w-[980px] md:w-[692px] w-11/12 mx-3 max-w-full mb-6 lg:text-[32px] md:text-[28px] sm:text-[24px] max-md:font-bold">
            The blog
          </h2>
          <div id="posts" className="width mx-3">
            <button
              className="w-full md:rounded-2xl underline-offset-0 max-w-full"
              onClick={() => {
                router.push(`/${first["id"]}`);
              }}
            >
              <motion.div
                style={{ y: 30 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex md:flex-row flex-col md:w-auto min-w-[366px] max-w-full">
                  <div
                    className={`lg:basis-[643px] md:basis-[453px] bg-cover md:h-full lg:min-h-[362px] md:min-h-[255px] sm:min-h-auto bg-center md:rounded-l-2xl  md:rounded-tr-none  rounded-t-lg transition hover:after:scale-110 max-w-full h-full min-h-[200px]`}
                    style={{
                      backgroundImage: `url(${first.thumbnail})`,
                      transform:
                        "transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,opacity 1s cubic-bezier(0.4, 0, 0.25, 1) 0ms",
                    }}
                  ></div>
                  <div className="bg-white md:rounded-r-2xl basis-0 no-underline flex justify-between flex-col text-left lg:min-w-[337px] md:rounded-tr-2xl rounded-tr-none md:rounded-bl-none rounded-b-2xl">
                    <div className="lg:p-8 p-6 lg:w-[337px] md:w-[239px]">
                      <div className=" text-[#6e6e73] text-xs mb-2 font-bold">
                        {first.category}
                      </div>
                      <div className="lg:text-[32px] text-[21px] font-bold lg:leading-h1-sm md:leading-h2-normal leading-sm-title">
                        {first.title}
                      </div>
                    </div>
                    <div className="lg:p-8 p-6 text-[14px] text-[#6e6e73] font-bold">
                      {dateChanger(first.date)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </button>
            <div className="flex md:flex-row flex-col lg:gap-x-9 md:gap-x-6 flex-wrap  max-w-full">
              {tops.map((post) => (
                <div key={post.title} className="lg:mt-9 mt-6 max-w-full">
                  <button
                    onClick={() => {
                      router.push(`/${post.id}`);
                    }}
                    className="basis-1/2 flex flex-col w-full max-w-full"
                    ref={scrollRef}
                    // style={{ overflow: "scroll" }}
                  >
                    <LazyMotion features={domAnimation}>
                      <motion.div
                        style={{ y: 30 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                      >
                        <div
                          className={`bg-cover md:h-full lg:min-h-[266px] md:min-h-[187px] min-h-auto bg-center md:rounded-t-2xl rounded-t-xl transition hover:after:scale-110 w-full h-full min-h-[200px] lg:w-[472px]`}
                          style={{
                            backgroundImage: `url(${post.thumbnail})`,
                          }}
                        ></div>
                        <div className=" lg:p-8 p-6 bg-white md:rounded-b-2xl rounded-b-lg text-left lg:h-[180px] lg:w-[472px] md:h-[172px] md:w-[333px] md:max-w-none md:min-w-0 min-w-[366px] w-auto h-auto flex flex-col justify-between max-w-screen">
                          <div>
                            <div className=" text-[#6e6e73] text-xs mb-2 font-bold">
                              {post.category}
                            </div>
                            <div className="lg:text-[24px] text-[19px] font-bold lg:leading-h1-sm md:leading-h2-normal leading-sm-title">
                              {post.title}
                            </div>
                          </div>
                          <div className="text-[14px] text-[#6e6e73] font-bold">
                            {dateChanger(post.date)}
                          </div>
                        </div>
                      </motion.div>
                    </LazyMotion>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex md:flex-row flex-col lg:gap-x-8 md:gap-x-6 max-w-full flex-wrap">
              {seconds.map((sec) => (
                <div key={sec.title} className="lg:mt-9 mt-6">
                  <button
                    onClick={() => {
                      router.push(`/${sec.id}`);
                    }}
                    className="lg:basis-1/3 basis-1/2 flex flex-col w-full max-w-full"
                    ref={scrollRef}
                  >
                    <LazyMotion features={domAnimation}>
                      <motion.div
                        style={{ y: 30 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                      >
                        <div
                          className={`bg-cover md:h-full md:min-h-[187px] min-h-auto bg-center md:rounded-t-2xl rounded-t-xl transition hover:after:scale-110 w-full h-full min-h-[200px] lg:w-[303px] lg:h-[170px]`}
                          style={{
                            backgroundImage: `url(${sec.thumbnail})`,
                          }}
                        ></div>
                        <div className=" lg:p-8 p-6 bg-white md:rounded-b-2xl rounded-b-lg text-left lg:w-[303px] lg:h-[148px] md:h-[172px] md:w-[333px] md:max-w-none md:min-w-0 min-w-[366px] w-auto h-auto flex flex-col justify-between max-w-screen">
                          <div>
                            <div className=" text-[#6e6e73] text-xs mb-2 font-bold">
                              {sec.category}
                            </div>
                            <div className="text-[19px] font-bold md:leading-h2-normal leading-sm-title">
                              {sec.title}
                            </div>
                          </div>
                          <div className="text-[14px] text-[#6e6e73] font-bold">
                            {dateChanger(sec.date)}
                          </div>
                        </div>
                      </motion.div>
                    </LazyMotion>
                  </button>
                </div>
              ))}
            </div>
            <h2 className="sm:mx-auto lg:w-[980px] md:w-[692px] w-11/12 mx-3 max-w-full mb-6 lg:text-[32px] md:text-[28px] sm:text-[24px]">
              その他の記事
            </h2>
            <div className="flex lg:flex-row flex-col max-w-full flex-wrap w-full overflow-hidden">
              {others.map((o) => (
                <div
                  key={o.title}
                  className="lg:basis-1/2 lg:w-1/2 md:min-h-[157px] min-h-[136px] basis-1 md:w-[692px] min-w-[366px] md:min-w-0 lg:mb-0 mb-6 border-b-2 border-slate-300 lg:mt-8"
                >
                  <button
                    className="lg:w-[457px] lg:h-[165px] flex flex-row lg:mr-16"
                    onClick={() => {
                      router.push(`/${o.id}`);
                    }}
                    ref={scrollRef}
                  >
                    <LazyMotion features={domAnimation}>
                      <motion.div
                        style={{ y: 30 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="flex flex-row"
                      >
                        <div
                          className={`bg-cover md:h-full md:min-h-[132px] h-[105px] w-[105px] min-h-auto bg-center rounded-xl transition md:w-[132px]`}
                          style={{
                            backgroundImage: `url(${o.thumbnail})`,
                          }}
                        ></div>
                        <div className="md:pl-6 pl-4 text-left md:h-[132px] lg:w-[325px] md:w-[499px] md:max-w-none md:min-w-0 w-[261px] h-[111px] flex flex-col max-w-screen py-auto justify-center">
                          <div className="">
                            <div className=" text-[#6e6e73] text-xs mb-1 font-bold">
                              {o.category}
                            </div>
                            <div className="lg:text-[24px] text-[19px] font-bold lg:leading-h1-sm md:leading-h2-normal leading-sm-title">
                              {o.title}
                            </div>
                            <div className="text-[14px] text-[#6e6e73] font-bold">
                              {dateChanger(o.date)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </LazyMotion>
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full h-auto flex">
              <button className="btn btn-outline mt-10 rounded-full mx-auto items-center justify-center border-2">
                他の記事を見る
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
