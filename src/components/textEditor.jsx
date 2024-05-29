// src/components/TextEditor.jsx
import React, { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import Toolbar from "./Toolbar.jsx";
import "draft-js/dist/Draft.css";
import "./toolBar.css"; // Ensure you import the CSS file

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div style={{ padding: "20px" }}>
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "400px",
          boxShadow: "lightcoral 0px 0px 10px 0px",
        }}
      >
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};

export default TextEditor;
