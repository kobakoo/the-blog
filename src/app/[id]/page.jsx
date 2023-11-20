"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Seo from "@/components/Seo";

function Page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState({});
  const [postExist, setPostExist] = useState(true);
  const [shareData, setShareData] = useState({});

  useEffect(() => {
    getPost(params.id);
  }, [params.id]);

  async function getPost(id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setPostExist(true);
      setData(docSnap.data());
      const share = {
        title: docSnap.get("title"),
        url: "https://blog.kobakoo.com/" + docSnap.get("id"),
      };
      setShareData(share);
    } else {
      // docSnap.data() will be undefined in this case
      setPostExist(false);
      console.log("No such document!");
    }
  }
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

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(
      `https://blog.kobakoo.com/${params.id}`
    );
    alert("urlをコピーできました!");
  };

  return (
    <div className="bg-[#fff] min-h-screen">
      {/* <Toaster /> */}
      <Seo
        pageTitle={"The blog"}
        pageDescription={`${data.description}`}
        pageImg={`${data.thumbnail}`}
        pageImgWidth={1600}
        pageImgHeight={900}
        pagePath={`https://blog.kobakoo.com/${params.id}`}
        articleCategory={data.category}
        articleWhenPublished={data.date}
      />
      <Header />
      {postExist ? (
        <div className="">
          <article className="md:mt-16 mt-10">
            <div className=" mx-4">
              <div className="w-article mb-5">
                <span className=" text-[12px] text-[#6e6e73] leading-h1-lg font-bold block">
                  <button
                    onClick={() => {
                      router.push(`/cat/${data.category}`);
                    }}
                  >
                    {data.category}
                  </button>
                </span>
                <span className=" text-[12px] text-[#6e6e73] leading-h1-lg mt-1 font-semibold block">
                  {dateChanger(data.date)}
                </span>
              </div>
              <h1 className="w-article">{data.title}</h1>
              <div className="w-article block">
                <div className="text-[#6e6e73] fill-gray-500 flex h-auto mt-8 mb-10">
                  <button
                    className="w-4 h-6 mr-6 md:hidden"
                    onClick={async () => {
                      if (!window.navigator.share) {
                        alert("ご利用のブラウザでは共有できません。");
                        return;
                      }
                      try {
                        await window.navigator.share(shareData);
                        alert("共有が完了しました。");
                      } catch (e) {
                        console.log(e.message);
                      }
                    }}
                  >
                    <Image
                      src={"/share.svg"}
                      width={20}
                      height={30}
                      alt="share"
                      className="rounded-none my-0 m-auto"
                    />
                  </button>
                  <button
                    className="w-5 h-5 mr-6 max-md:hidden mt-1"
                    onClick={() => {
                      let newwin = open(
                        `http://twitter.com/share?url=https://blog.kobakoo.com/${params.id}&related=@kobako0o`
                      );
                    }}
                  >
                    <Image
                      src={"/x-twitter.svg"}
                      width={25}
                      height={25}
                      alt="share"
                      className="rounded-none my-0 m-auto"
                    />
                  </button>
                  <button className="w-5 h-4 mr-6 my-auto mt-1.5">
                    <a
                      href={`mailto:info@example.com?cc=info@kobakoo.com&subject=${data.title}&body=https://blog.kobakoo.com/${params.id}`}
                    >
                      <Image
                        src={"/mail.svg"}
                        width={20}
                        height={15}
                        alt="share"
                        className="rounded-none my-0"
                      />
                    </a>
                  </button>
                  <button
                    className="w-5 h-5 my-auto mt-0.5 mr-6"
                    onClick={copyToClipboard}
                  >
                    <Image
                      src={"/link.svg"}
                      width={20}
                      height={20}
                      alt="share"
                      className="rounded-none my-0"
                    />
                  </button>
                  <button
                    className="w-5 h-5 md:hidden mt-1"
                    onClick={() => {
                      let newwin = open(
                        `http://twitter.com/share?url=https://blog.kobakoo.com/${params.id}&related=@kobako0o`
                      );
                    }}
                  >
                    <Image
                      src={"/x-twitter.svg"}
                      width={25}
                      height={25}
                      alt="share"
                      className="rounded-none my-0 m-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
            <Image
              className=" lg:w-[653px] md:w-[576px] sm:w-[414px] w-full max-w-full mx-auto my-0 mb-11"
              src={data.thumbnail}
              width={832}
              height={468}
              alt={(data.title, data.description)}
            ></Image>
            <div
              className="w-article px-"
              dangerouslySetInnerHTML={{ __html: data.code }}
            ></div>
          </article>
          <h3 className="w-article font-bold ">共有</h3>
          <div className="w-article block">
            <div className="text-[#6e6e73] fill-gray-500 flex h-auto mt-8 mb-10">
              <button
                className="w-4 h-6 mr-6 md:hidden"
                onClick={async () => {
                  if (!window.navigator.share) {
                    alert("ご利用のブラウザでは共有できません。");
                    return;
                  }
                  try {
                    await window.navigator.share(shareData);
                    alert("共有が完了しました。");
                  } catch (e) {
                    console.log(e.message);
                  }
                }}
              >
                <Image
                  src={"/share.svg"}
                  width={20}
                  height={30}
                  alt="share"
                  className="rounded-none my-0 m-auto"
                />
              </button>
              <button
                className="w-5 h-5 mr-6 max-md:hidden mt-1"
                onClick={() => {
                  let newwin = open(
                    `http://twitter.com/share?url=https://blog.kobakoo.com/${params.id}&related=@kobako0o`
                  );
                }}
              >
                <Image
                  src={"/x-twitter.svg"}
                  width={25}
                  height={25}
                  alt="share"
                  className="rounded-none my-0 m-auto"
                />
              </button>
              <button className="w-5 h-4 mr-6 my-auto mt-1.5">
                <a
                  href={`mailto:info@example.com?cc=info@kobakoo.com&subject=${data.title}&body=https://blog.kobakoo.com/${params.id}`}
                >
                  <Image
                    src={"/mail.svg"}
                    width={20}
                    height={15}
                    alt="share"
                    className="rounded-none my-0"
                  />
                </a>
              </button>
              <button
                className="w-5 h-5 my-auto mt-0.5 mr-6"
                onClick={copyToClipboard}
              >
                <Image
                  src={"/link.svg"}
                  width={20}
                  height={20}
                  alt="share"
                  className="rounded-none my-0"
                />
              </button>
              <button
                className="w-5 h-5 md:hidden mt-1"
                onClick={() => {
                  let newwin = open(
                    `http://twitter.com/share?url=https://blog.kobakoo.com/${params.id}&related=@kobako0o`
                  );
                }}
              >
                <Image
                  src={"/x-twitter.svg"}
                  width={25}
                  height={25}
                  alt="share"
                  className="rounded-none my-0 m-auto"
                />
              </button>
            </div>
          </div>
          <div className="w-article h-auto flex">
            <button
              className="btn btn-outline mt-10 rounded-full mx-auto items-center justify-center border-2"
              onClick={() => {
                router.push("/");
              }}
            >
              他の記事を見る
            </button>
          </div>

          <Footer />
        </div>
      ) : (
        <div id="notexist">see you</div>
      )}
    </div>
  );
}

export default Page;
