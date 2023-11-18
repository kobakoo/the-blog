import React from "react";

const ArticleEditor = dynamic(
  () => import("@components/ArticleEditor/ArticleEditor"),
  { ssr: false }
);

function WhereUsingArtcleEditor() {
  return (
    <ArticleEditor
      defaultValue={data}
      onChange={(api, event) => console.log("sample")}
      onReady={() => console.log("ready")}
      onSave={() => console.log("saved")}
    />
  );
}

export default WhereUsingArticleEditor;
