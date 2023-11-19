"use client";
import "reflect-metadata";
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useMutation, gql } from "@apollo/client";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { container } from "tsyringe";
import { db, storage } from "@/lib/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import MagicUrl from "quill-magic-url";
import Header from "@/components/Header";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-1" }); // 例: 'us-east-1'

function CustomIcon() {
  return <FontAwesomeIcon icon={faImage} />;
}

export default function MyComponent() {
  const [value, setValue] = useState(localStorage.getItem("localData"));
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("others");
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/blog-kobako.appspot.com/o/default.jpg?alt=media&token=06d68b5f-7363-4305-8684-387a95fa1624"
  );
  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setProfileImage(window.URL.createObjectURL(files[0]));
    }
  };

  // Amazon S3に画像を保存する関数
  // const [saveImageToS3] = useMutation(SAVE_IMAGE_TO_S3_MUTATION, {
  //   onCompleted: ({ saveImageToS3: { imageUrl } = {} }) => {
  //     // 画像が保存できたら、その保存先のURL(imageUrl)をinsertToEditor関数に渡す。
  //     insertToEditor(imageUrl);
  //   },
  // });

  // const ref = useRef(null);

  Quill.register("modules/magicUrl", MagicUrl);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const categories = [
    { name: "tech" },
    { name: "design" },
    { name: "news" },
    { name: "others" },
  ];

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const now = new Date();
      const now2 = now.toISOString();
      // await imageRef.put(file);
      const storageRef = ref(storage, `images/${now2 + file.name}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, file).then((snapshot) => {
        toast.success(`画像「${file.name}」は正常にアップロードされました`);
      });

      // getDownloadURL(storageRef).then((url) => {
      //   const range = editorRef.current.editor.getSelection();
      //   // editorRef.current.editor.insertEmbed(range.index, "image", url);
      //   editorRef.current.editor.clipboard.dangerouslyPasteHTML(
      //     range.index,
      //     `<img src="${url}" alt="${file.name}" style="max-width: 100%;" />`
      //   );
      //   editorRef.current.editor.setSelection(range.index + 1);
      // });
      try {
        const url = await getDownloadURL(storageRef);
        if (editorRef.current) {
          const quill = editorRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", url);
          quill.setSelection(range.index + 1);
        }
      } catch (error) {
        console.error("画像のダウンロード中にエラーが発生しました:", error);
        // エラー処理
      }
    };
  };

  async function fileUpload() {
    const now = new Date();
    const now2 = now.toISOString();
    const storageRef = ref(storage, `images/${now2 + file.name}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log(snapshot);
      toast.success(`画像「${file.name}」は正常にアップロードされました`);
    });
    const url = await getDownloadURL(storageRef);
    setProfileImage(url);
  }

  async function postBlog() {
    const txt = value.match(/[^\<\>]+(?=\<[^\<\>]+\>)|[^\<\>]+$/g);
    const text = txt.join(" ");
    const MAX_LENGTH = 158;
    const description = text.substr(0, MAX_LENGTH) + "...";
    console.log(description);
    const dateObject = new Date();
    // const now = dateObject.toISOString();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        code: value,
        description: description,
        category: selectedOption,
        thumbnail: profileImage,
        date: dateObject.toISOString(),
      });
      await console.log("Document written with ID: ", docRef.id);
      toast.success("Document written with ID: ", docRef.id.toString());
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error adding document: ", e);
    }
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [
        // [{ handlers: { image: selectLocalImage } }],
        "clean",
      ],
      // handlers: {
      //   image: function () {},
      // },
    ],
    magicUrl: true,
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div>
      <Toaster />
      <Header />
      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Title
      </h2>
      <div className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3  max-w-full">
        <input
          type="text"
          placeholder="Type a title here"
          className="input input-bordered w-full max-w-sm mt-6"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Thumbnail(16:9)
      </h2>
      <div className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3  max-w-full">
        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label> */}
        <div
          class={
            profileImage ? "hidden" : "flex items-center justify-center w-full"
          }
        >
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-6"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (Aspect/ 16:9)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept="image/*"
              onChange={onChangeFile}
            />
          </label>
        </div>
        <div className={profileImage ? "block flex" : "hidden"}>
          <Image
            src={profileImage}
            alt="will have uploaded image"
            className=""
            width={1152}
            height={648}
          />
          <button
            className="btn btn-circle btn-outline mt-3"
            onClick={() => {
              setFile(null);
              setProfileImage(null);
              toast.success("Uploaded image has been deleted!");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Category
      </h2>
      <div className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3  max-w-full mt-5">
        {categories.map((cat) => (
          <div className="form-control" key={cat.name}>
            <label className="label cursor-pointer">
              <span
                className={
                  selectedOption === cat.name
                    ? `label-text text-base font-bold transition text-[#06c]`
                    : `label-text text-base transition`
                }
              >
                {cat.name}
              </span>
              <input
                type="radio"
                value={cat.name}
                checked={selectedOption === cat.name}
                onChange={handleOptionChange}
                className={`radio checked:bg-blue-500`}
              />
            </label>
          </div>
        ))}
        {/* <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-base">Blue pill</span>
            <input
              type="radio"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
              className="radio checked:bg-blue-500"
            />
          </label>
        </div> */}
      </div>

      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Editor
      </h2>
      <ReactQuill
        key="quill-editor"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        ref={editorRef}
        className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full mt-6"
      />
      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Code
      </h2>
      <div className="mockup-code mt-6 sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full sm:rounded-md rounded-none">
        <pre data-prefix="~" className="mx-3">
          <code>{value}</code>
        </pre>
      </div>

      <h2 className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full">
        Preview
      </h2>
      <div className="mockup-browser border bg-base-300 sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3 max-w-full mt-6 sm:rounded-md rounded-none">
        <div className="mockup-browser-toolbar">
          <div className="input">https://blog.kobakoo.com</div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className="px-6 py-8"
        ></div>
      </div>
      {profileImage && value && title && selectedOption ? (
        <div className="sm:mx-auto lg:w-[800px] md:w-[692px] w-11/12 mx-3  max-w-full mt-6">
          <button
            className="btn bg-blue-500 text-white rounded-full btn-sm hover:bg-blue-700 transition my-3"
            onClick={() => {
              if (file) {
                fileUpload();
              }
              postBlog();
            }}
          >
            Post
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
