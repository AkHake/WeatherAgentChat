# Weather Agent Chat Interface

A minimal, responsive chat interface built with React and TypeScript that integrates
with a streaming Weather Agent API. The application focuses on clean UX, accessibility,
and modern frontend architecture.

---

## ✨ Features

- Chat-style interface with user and agent messages
- Real-time streaming response handling using Fetch ReadableStream
- Animated typing indicator for agent responses
- Suggested prompts for first-time users
- Light / Dark mode toggle with persisted preference
- Export chat history as a `.txt` file
- Auto-scroll to latest messages
- Graceful error handling when the agent is unavailable
- Keyboard navigation and basic accessibility support (ARIA)

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- CSS (custom, minimal black & white theme)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install

### 2. Environment setup

Create a .env file in the project root:
VITE_WEATHER_AGENT_URL=YOUR_API_URL

### 3. Run the app
```bash
npm run dev
```
http://localhost:5173
