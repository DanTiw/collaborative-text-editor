require('dotenv').config();
const mongoose = require("mongoose");
const Document = require("./document");
const express = require('express');

const cors = require('cors');

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('connected'));


app.use(cors({
  origin: "https://collaborative-text-editor-six.vercel.app",
  methods: ["GET", "POST"],
}));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://collaborative-text-editor-six.vercel.app",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  console.log('New client connected');

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send", (delta) => {
      socket.broadcast.to(documentId).emit("receive", delta);
    });

    socket.on("save-document", async (data) => {
      
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  let document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
