import "./globals.css";
import { DefaultSeo } from "next-seo";

export const metadata = {
  title: "The blog",
  description: "小箱のブログです",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "ja_JP",
          url: "https://blog.kobakoo.com/",
          siteName: "The blog",
        }}
        twitter={{
          handle: "@kobako0O",
          cardType: "summary_large_image",
        }}
      />
      <body>{children}</body>
    </html>
  );
}
