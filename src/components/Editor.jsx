import { useEffect, useRef, useState } from "react";
import "reflect-metadata";
import EditorJS from "@editorjs/editorjs";
import useId from "@mui/utils/useId";

import { EditorTools, i18n } from "@/lib/EditorTools";

const ArticleEditor = ({
  defaultValue,
  placeholder,
  readOnly,
  minHeight,
  onReady,
  onChange,
  onSave,
}) => {
  const id = useId();
  const editorJS = useRef(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: id,
        data: defaultValue,
        i18n,
        tools: EditorTools,
        onChange(api, event) {
          editorJS.current?.save().then((res) => {
            setCurrentArticle(res);
            onSave(res);
          });
          onChange(api, event);
        },
        onReady() {
          onReady();
        },
      });
    }
  }, []);
  useEffect(() => {
    console.log(currentArticle);
  }, [currentArticle]);
  return <div id={id} />;
};

ArticleEditor.defaultProps = {
  placeholder: "",
  readOnly: false,
  minHeight: 0,
};

export default ArticleEditor;
