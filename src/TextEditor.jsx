import React, {useState, useCallback, useEffect} from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
export default function TextEditor() {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState()

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
    //Set up socket
    useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)
        return () => {
            s.disconnect()
        }
    }, []);
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
    //U
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

    setQuill(q)
}, [])
        return <div className="container" ref={wrapperRef}></div>
}

