import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import "reflect-metadata";
import { container } from "tsyringe";

// import { fetchRoutes } from "@repositories/EditorRepository";
// import EditorService from "@services/EditorService/EditorService";

// const editorService = container.resolve(EditorService);
export const EditorTools = {
  header: {
    class: Header,
    shortcut: "CMD+SHIFT+H",
    config: {
      placeholder: "へッダー",
      levels: [1, 2, 3, 4],
      defaultLevel: 3,
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:3000/api/link",
    },
  },
  // image: {
  //   class: ImageTool,
  //   config: {
  //     uploader: {
  //       uploadByFile(file) {
  //         const form = { image: file };
  //         return editorService.uploadFile(form).then((res) => res.data);
  //       },
  //       // only work when url has extensions like .jpg
  //       uploadByUrl(url) {
  //         const form = { url };
  //         return editorService.uploadFileByUrl(form);
  //       },
  //     },
  //   },
  // },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "テキストを入力",
      captionPlaceholder: "キャプションを入力",
    },
  },
  delimiter: Delimiter,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
};

export const i18n = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "クリックして調整",
          "or drag to move": "ドラッグして移動",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "変換",
        },
      },
      toolbar: {
        toolbox: {
          Add: "追加",
        },
      },
    },
    toolNames: {
      Text: "テキスト",
      Heading: "タイトル",
      List: "リスト",
      Checklist: "チェックリスト",
      Quote: "引用",
      Delimiter: "直線",
      Table: "表",
      Link: "リンク",
      Bold: "太字",
      Italic: "斜体",
      Image: "画像",
      Marker: "マーカー",
    },
    blockTunes: {
      deleteTune: {
        Delete: "削除",
      },
      moveUpTune: {
        "Move up": "上に移動",
      },
      moveDownTune: {
        "Move down": "下に移動",
      },
    },
  },
};
