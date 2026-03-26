# FlowDesk Support Agent 🤖

An AI-powered customer support chatbot for **FlowDesk** — a fictional SaaS project management tool. Built with a full RAG (Retrieval-Augmented Generation) pipeline using LangChain, ChromaDB, and Gemini, deployed on HuggingFace Spaces and Vercel.

🔗 **Live Demo:** [flowdesk-support-agent.vercel.app](https://flowdesk-support-agent.vercel.app)  
🚀 **Backend API:** [Fardeen1004-flowdesk-support-agent.hf.space](https://Fardeen1004-flowdesk-support-agent.hf.space)

---

## What It Does

Users can ask natural language support questions about FlowDesk — pricing, features, troubleshooting, account management — and the agent retrieves accurate answers directly from the knowledge base, with source citations shown in the UI.

**Example questions:**
- *"What is the Pro plan price?"*
- *"How do I invite a team member?"*
- *"My payment failed, what should I do?"*
- *"Does FlowDesk integrate with Slack?"*

---

## Architecture

```
User Question
      ↓
React Frontend (Vercel)
      ↓
FastAPI Backend (HuggingFace Spaces)
      ↓
LangChain ConversationalRetrievalChain
      ↓
   ┌─────────────────────────────┐
   │                             │
ChromaDB Retriever          Conversation
(semantic search over KB)     Memory
   │                             │
   └──────────┬──────────────────┘
              ↓
         Gemini LLM
         (generates answer)
              ↓
      Answer + Source Citations
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| LLM | Google Gemini |
| RAG Framework | LangChain |
| Vector Database | ChromaDB |
| Embeddings | HuggingFace `all-MiniLM-L6-v2` |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Vite + Tailwind CSS |
| Backend Deployment | HuggingFace Spaces (Docker) |
| Frontend Deployment | Vercel |

---

## Features

- **RAG Pipeline** — Retrieves answers from a structured knowledge base, not hallucinated responses
- **Conversation Memory** — Remembers the last 5 turns for contextual follow-up questions
- **Source Citations** — Every answer shows which KB document it came from
- **Chunk-level Retrieval** — Knowledge base split into 200-character chunks for precise retrieval
- **Clean Chat UI** — Message bubbles, source chips, typing indicator, error handling

---

## Knowledge Base

The agent answers questions from 5 structured markdown documents:

| File | Content |
|---|---|
| `faq.md` | General questions, account, integrations |
| `pricing.md` | Free, Pro, Enterprise plan details |
| `getting_started.md` | Onboarding guide, keyboard shortcuts |
| `troubleshooting.md` | Login, task, notification, billing issues |
| `account_billing.md` | Profile, 2FA, seat management, GDPR |

---

## Project Structure

```
flowdesk-support-agent/
├── app/
│   ├── main.py           # FastAPI endpoints
│   ├── agent.py          # LangChain RAG chain
│   ├── ingest.py         # Knowledge base ingestion
│   └── prompts.py        # System prompt template
├── knowledge_base/
│   ├── faq.md
│   ├── pricing.md
│   ├── getting_started.md
│   ├── troubleshooting.md
│   └── account_billing.md
├── frontend/
│   └── src/
│       └── App.jsx       # React chat UI
├── Dockerfile
├── requirements.txt
└── .env.example
```

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (for local Qdrant, optional)

### Backend

```bash
# Clone the repo
git clone https://github.com/Fardeen387/flowdesk-support-agent.git
cd flowdesk-support-agent

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Ingest knowledge base
python app/ingest.py

# Start backend
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API

### `POST /chat`

**Request:**
```json
{
  "message": "What is the Pro plan price?"
}
```

**Response:**
```json
{
  "answer": "The Pro plan costs $12/user/month billed annually or $15/user/month billed monthly...",
  "sources": ["pricing.md", "account_billing.md"]
}
```

### `GET /health`
```json
{"status": "FlowDesk AI Backend is Running"}
```

---

## Deployment

### Backend — HuggingFace Spaces (Docker)
The `Dockerfile` runs `ingest.py` on startup to build the ChromaDB index, then launches the FastAPI server on port 7860.

### Frontend — Vercel
Connected to GitHub repo with root directory set to `frontend/`. Auto-deploys on every push to `main`.

---

## Built By

**Fardeen** — B.Tech CSE, Bansal Institute of Science and Technology  
[GitHub](https://github.com/Fardeen387) · [LinkedIn](https://linkedin.com/in/fardeen)
