
---

# Collaborative Text Editor

A real-time collaborative text editor built with React, Quill, and Socket.IO, and hosted on Vercel. This application allows multiple users to edit a document simultaneously with changes being saved to a MongoDB database.

## Features

- Real-time collaboration with multiple users
- Rich text editing with Quill
- Automatic saving of document changes
- MongoDB for document storage

## Tech Stack

- Frontend: React, Quill
- Backend: Node.js, Express, Socket.IO
- Database: MongoDB

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account with a database cluster

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/collaborative-text-editor.git
   cd collaborative-text-editor
   ```

2. Create a `.env` file in the root of the project and add your MongoDB connection string:
   ```plaintext
   MONGO_URI=your-mongodb-connection-string
   PORT=3001
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. In the `src` directory, update the Socket.IO server URL in your `TextEditor` component to match your deployed backend URL:
   ```javascript
   const socket = io('https://your-backend-url');
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

## Usage

1. Open the frontend URL in your browser.
2. Create a new document or open an existing document by entering its ID in the URL (e.g., `http://localhost:3000/documents/:id`).
3. Start editing the document. Changes will be synchronized in real-time with other users and saved automatically.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

---
