from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from agent import get_qa_chain
import os

# 1. Initialize FastAPI
app = FastAPI(
    title="FlowDesk AI Support API",
    description="Backend API for the FlowDesk AI Customer Support Agent",
    version="1.0.0"
)

# 2. Add CORS Middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define Request/Response Schemas
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]

# 4. Initialize the Agent
qa_chain = get_qa_chain()

@app.get("/")
def root():
    return {"status": "FlowDesk AI Backend is Running"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = qa_chain.invoke({"question": request.message})
        
        sources = list(set([
            os.path.basename(doc.metadata.get("source", "Unknown")) 
            for doc in result.get("source_documents", [])
        ]))

        return ChatResponse(
            answer=result["answer"],
            sources=sources
        )
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)