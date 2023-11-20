import Head from "next/head";

export default function Seo(title, description, url, thumbnail) {
  const pageTitle = title;
  const ogUrl = url;
  const ogImage = thumbnail;
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:locale" content={"ja_JP"} />
      <meta name="twitter:card" content={"summary"} />
      <meta name="twitter:site" content={"@kobako0o"} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={ogUrl} />
    </>
  );
}
