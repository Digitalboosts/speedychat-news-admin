import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Editor.module.css";

const Editor = ({ title, setTitle, content, setContent }) => {
  const [contentLength, setContentLength] = useState(0);
  const quillRef = useRef();

  const modules = { 
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // ["bold", "italic", "underline", "strike"],
      // [{ list: "ordered" }, { list: "bullet" }],
      // ["blockquote", "code-block"],
      // [{ align: [] }],
      // ["link", "image", "video"],
      // [{ color: [] }, { background: [] }],
      // ["clean"],
      ["font", "size"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleContentChange = (value) => {
    const wordCount = countWords(value);
    if (wordCount <= 60) {
      setContent(value);
      setContentLength(wordCount);
    } else {
      // Prevent adding more words
      const editor = quillRef.current.getEditor();
      editor.deleteText(editor.getLength() - 2, editor.getLength());
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add title"
      />
      <ReactQuill
        className={style.editor}
        ref={quillRef}
        value={content}
        placeholder="Start writing"
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />
      <p className={style.count}>Word count: {contentLength}</p>
    </div>
  );
};

export default Editor;
