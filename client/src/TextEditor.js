import React, {useState, useCallback, useEffect} from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
export default function TextEditor() {
  //Add or Remove Toolbar options
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { id: documentId } = useParams()
  const SAVE_INTERVAL_MS = 2000;


  //Set up socket
  useEffect(() => {
  const s =  io("https://collaborative-text-editor-backend.vercel.app")
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, []);

  //check doc id here
  useEffect(() => {
    if (socket == null || quill == null) return
    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })
    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  //Recieve changes
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive", handler)

    return () => {
      socket.off("receive", handler)
    }
  }, [socket, quill])

  //Send changes
  useEffect(() => {
    if (socket == null || quill == null) return
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send", delta)
    }
    quill.on("text-change", handler)
    return () => {
      quill.off("text-change", handler)
    }
  })

  //Saving data in Database
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  //Used callback to avoid infinite loop

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Server Loading :D")
    setQuill(q)
  }, [])
  return <div className="container" ref={wrapperRef}></div>
}

