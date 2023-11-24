"use client";
import Header from "@/components/Header";
import { db } from "@/lib/FirebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

function Page() {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const scrollRef = useRef(null);
  const router = useRouter();

  async function getData() {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    await getDocs(q).then((snapshot) => {
      let topPosts = [];
      snapshot.docs.forEach((doc) => {
        var json = doc.data();
        json.id = doc.id;
        topPosts.push(json);
        // console.log(doc.data());
      });
      setPosts(topPosts);
    });
  }

  useEffect(() => {
    getData();
    // setPosts(splitArray(data, 10));
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);

  useEffect(() => {
    console.log(posts);
    // setPosts(slicedPosts);
  }, [posts]);

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

  return (
    <>
      <Header />
      <h2 className="sm:mx-auto lg:w-[980px] md:w-[692px] w-11/12 mx-3 max-w-full mb-6 lg:text-[32px] md:text-[28px] sm:text-[24px] max-md:font-bold">
        Archive
      </h2>
      {posts.map((post) => (
        <div
          key={post.date}
          className="width md:min-h-[157px] min-h-[136px] lg:mt-4 w-full lg:mb-0 mb-4 border-b-2"
        >
          <button
            className="w-full flex flex-row lg:mr-16"
            onClick={() => {
              router.push(`/${post.id}`);
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
                <Image
                  className={`bg-cover md:h-full md:min-h-[132px] h-[105px] md:min-w-[240px] w-[180px] min-h-auto bg-center rounded-xl transition `}
                  // style={{
                  //   backgroundImage: `url(${post.thumbnail})`,
                  // }}
                  width={400}
                  height={225}
                  src={post.thumbnail}
                  alt={post.title + post.description}
                ></Image>
                <div className="md:pl-6 pl-4 text-left md:h-[132px] lg:min-w-[600px] lg:w-full md:w-[499px] md:max-w-none md:min-w-0 w-[261px] h-[111px] flex flex-col max-w-screen py-auto justify-center">
                  <div className="">
                    <div className=" text-[#6e6e73] text-xs mb-1 font-bold">
                      {post.category}
                    </div>
                    <div className="lg:text-[24px] text-[19px] font-bold lg:leading-h1-sm md:leading-h2-normal leading-sm-title">
                      {post.title}
                    </div>
                    <div className="text-[14px] text-[#6e6e73] font-bold">
                      {dateChanger(post.date)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </LazyMotion>
          </button>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default Page;
