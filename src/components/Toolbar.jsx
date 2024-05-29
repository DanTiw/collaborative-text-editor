import React from "react";
import { RichUtils } from "draft-js";
import { IconButton } from "@mui/material";
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Title,
} from "@mui/icons-material";
import "./toolBar.css";

const Toolbar = ({ editorState, setEditorState }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const onInlineStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onBlockTypeClick = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const styleButton = (style) => {
    return currentStyle.has(style) ? "active-button" : "";
  };

  const blockButton = (type) => {
    return blockType === type ? "active-button" : "";
  };
  return (
    <div className="toolbar">
      <IconButton
        onClick={() => onInlineStyleClick("BOLD")}
        className={styleButton("BOLD")}
      >
        <FormatBold style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onInlineStyleClick("ITALIC")}
        className={styleButton("ITALIC")}
      >
        <FormatItalic style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onInlineStyleClick("UNDERLINE")}
        className={styleButton("UNDERLINE")}
      >
        <FormatUnderlined style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onInlineStyleClick("STRIKETHROUGH")}
        className={styleButton("STRIKETHROUGH")}
      >
        <FormatStrikethrough style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onBlockTypeClick("blockquote")}
        className={blockButton("blockquote")}
      >
        <FormatQuote style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onBlockTypeClick("code-block")}
        className={blockButton("code-block")}
      >
        <Code style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onBlockTypeClick("header-one")}
        className={blockButton("header-one")}
      >
        <Title style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onBlockTypeClick("unordered-list-item")}
        className={blockButton("unordered-list-item")}
      >
        <FormatListBulleted style={{ color: "lightcoral" }} />
      </IconButton>
      <IconButton
        onClick={() => onBlockTypeClick("ordered-list-item")}
        className={blockButton("ordered-list-item")}
      >
        <FormatListNumbered style={{ color: "lightcoral" }} />
      </IconButton>
      <p className="text1">A Simple Rich Text Editor using React</p>
    </div>
  );
};

export default Toolbar;
