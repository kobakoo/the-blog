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
    return {
      metadataBase: new URL("https://blog.kobakoo.com"),
      title: {
        default: "The Blog",
        /** `next-seo`の`titleTemplate`に相当する機能 */
        template: `%s - The Blog`,
      },
      description,
      openGraph: {
        title: siteName,
        description: description,
        url: url,
        siteName: siteName,
        locale: "ja_JP",
        type: "website",
        images: [
          {
            url: params.data.thumbnail,
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
      },
      verification: {
        google: "ncVLbtSbqBm70UjMc0zTd2TFhTBnEAVXNmXHxPyWs5w",
      },
      alternates: {
        canonical: url,
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
