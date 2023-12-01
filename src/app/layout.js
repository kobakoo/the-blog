import "./globals.css";
import Script from "next/script";
export const metadata = {
  title: {
    template: "%s | KBK Blog",
    default: "The Blog", // a default is required when creating a template
  },
  description:
    "The Blog｜コバコが書く雑記ブログです。コバコはいつでもあなたを待っています",
  generator: "Next.js",
  applicationName: "The Blog",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "Design",
    "JavaScript",
    "Tech",
    "Technology",
    "kobako",
    "道徳は暗記科目",
    "コバコ",
    "簡単",
    "便利",
    "chatgpt",
    "iphone",
    "ツイッター",
    "チャットgpt",
  ],
  authors: [{ name: "Kobako", url: "https://kobakoo.com" }],
  creator: "Ryusei Kobayashi",
  publisher: "Ryusei Kobayashi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://blog.kobakoo.com"),
  openGraph: {
    title: "The Blog",
    description:
      "The Blog｜コバコが書く雑記ブログです。コバコはいつでもあなたを待っています",
    type: "website",
    publishedTime: "Thu Nov 23 2023",
    authors: ["Kobako"],
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

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2865457642883268"
        crossorigin="anonymous"
      />
      <body>{children}</body>
    </html>
  );
}
