import Head from "next/head";
import { NextSeo } from "next-seo";

const Seo = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  articleCategory,
  articleWhenPublished,
}) => {
  const defaultTitle = "The Blog by kobako";
  const defaultDescription =
    "The Blog  by kobako ためになりそうな情報を発信しています";

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : defaultDescription;
  const url = pagePath;
  const imgUrl = pageImg;
  const imgWidth = pageImgWidth ? pageImgWidth : 1200;
  const imgHeight = pageImgHeight ? pageImgHeight : 900;

  return (
    <Head>
      <title>{title}</title>
      {/* <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={url} /> */}
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url: url,
          title: title,
          description: description,
          type: "article",
          images: [
            {
              url: imgUrl,
              width: imgWidth,
              height: imgHeight,
              alt: `Thumbnail ${title}`,
              type: "image/jpeg",
            },
          ],
          article: {
            publishedTime: articleWhenPublished,
            section: "Section II",
            authors: ["https://www.example.com/authors/@firstnameA-lastnameA"],
            tags: [articleCategory],
          },
          siteName: "The Blog",
        }}
        twitter={{
          handle: "@koabko0O",
          cardType: "summary_large_image",
        }}
      />
    </Head>
  );
};

export default Seo;
