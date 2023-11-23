import Post from "@/components/Post";
import { db } from "@/lib/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { cache } from "react";

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const description = data.description;
    const url = `https://blog.kobakoo.com/${id}`;
    const siteName = data.title;
    const category = data.category;
    return {
      metadataBase: new URL("https://blog.kobakoo.com"),
      title: {
        default: "The Blog",
        /** `next-seo`の`titleTemplate`に相当する機能 */
        template: `%s - The Blog`,
      },
      description: description,
      category: category,
      authors: ["Kobako"],
      openGraph: {
        title: siteName,
        description: description,
        url: url,
        siteName: siteName,
        locale: "ja_JP",
        type: "article",
        publishedTime: data.date,
        authors: ["Kobako"],
        images: [
          {
            url: data.thumbnail,
            width: 1600,
            height: 900,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: siteName,
        description: description,
        creator: "@kobako0o",
        images: [`${data.thumbnail}`],
      },
      verification: {
        google: "ncVLbtSbqBm70UjMc0zTd2TFhTBnEAVXNmXHxPyWs5w",
      },
      alternates: {
        canonical: url,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          imageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } else {
    return;
  }
}

export default async function Page({ params }) {
  const id = params.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return <Post data={data} id={id} />;
  } else {
    return <div>404 not found</div>;
  }
}
