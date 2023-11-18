// pages/api/ogp.js
import axios from "axios";

export default async function GET(req, res) {
  const { url } = req.query;

  try {
    // URLからOGP情報を取得する処理
    const ogpData = await fetchOGPData(url);

    // 必要なフィールドだけを抽出
    const { image, title, description } = extractOGPFields(ogpData);

    res.status(200).json({
      success: 1,
      meta: {
        title: title,
        image: {
          url: image,
        },
        description: description,
      },
    });
  } catch (error) {
    console.error("Error fetching OGP data:", error);
    res.status(500).json({
      success: 0,
    });
  }
}

async function fetchOGPData(url) {
  // 実際のOGP情報を取得する処理
  const response = await axios.get(`https://example.com/api/ogp?url=${url}`);
  return response.data;
}

function extractOGPFields(ogpData) {
  // 必要なフィールドだけを抽出する処理
  const { ogImage, ogTitle, ogDescription } = ogpData;

  return {
    image: ogImage?.url || null,
    title: ogTitle || null,
    description: ogDescription || null,
  };
}
