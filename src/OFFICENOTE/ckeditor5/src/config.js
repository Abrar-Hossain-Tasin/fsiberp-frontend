const config = (placeholder) => {
  return {
    placeholder: placeholder,
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "findAndReplace",
        "alignment",
        "bulletedList",
        "numberedList",
        "insertTable",
        "|",
        "fontFamily",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "highlight",
        "|",
        "outdent",
        "indent",
        "|",
        "horizontalLine",
        "pageBreak",
        "blockQuote",
        "removeFormat",
        "subscript",
        "superscript",
        "todoList",
      ],
      shouldNotGroupWhenFull: true,
    },
    removePlugins: ["Title"],
    mediaEmbed: {
      toolbar: ["mediaEmbed", "undo", "redo"],
    },
    image: {
      uploadUrl: "http://localhost:8000/api/form-data",
    },
    fontSize: {
      options: [
        9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44,
        48, 56, 64, 72,
      ],
    },
  };
};

export default config;
