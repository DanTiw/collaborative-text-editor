---

# Collaborative Text Editor

Welcome to the Collaborative Text Editor! This project is a real-time collaborative text editor built with React, Quill, and sockets. Each document is uniquely identified using UUIDs, allowing multiple users to edit the same document simultaneously.

## Features

- **Real-time Collaboration**: Multiple users can edit the same document simultaneously with changes reflected in real-time.
- **Rich Text Editing**: Utilizes Quill as the text editor to provide a feature-rich editing experience.
- **Unique Documents**: Each document is assigned a unique identifier (UUID) for easy access and management.
- **React**: Built with the popular React library for a dynamic and responsive user interface.
- **Sockets**: Ensures real-time communication and synchronization between users.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DanTiw/collaborative-text-editor.git
   cd collaborative-text-editor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Backend Setup

The application uses sockets for real-time communication. Ensure you have the backend server running that handles socket connections.

1. **Navigate to the backend directory:**

   ```bash
   cd server
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the backend server:**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

### Environment Variables

Make sure to configure the necessary environment variables for both the client and server. Typically, this would include settings for the server port, database connections, etc.

---
