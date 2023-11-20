import "./globals.css";

export const metadata = {
  title: "The blog",
  description: "小箱のブログです",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
