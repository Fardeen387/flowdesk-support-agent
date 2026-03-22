

import os
from pathlib import Path

from langchain_classic.chains import ConversationalRetrievalChain
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Qdrant
from langchain_huggingface import HuggingFaceEmbeddings

from qdrant_client import QdrantClient
from prompts import QA_PROMPT

from langchain_classic.memory import ConversationBufferMemory

from dotenv import load_dotenv

basedir = Path(__file__).resolve().parent.parent
env_file = basedir / ".env"

# Debug check (remove after fix)
print(f"Loading .env from: {env_file}")
print(f"File exists: {env_file.exists()}")

loaded = load_dotenv(env_file, override=True)
print(f"Loaded successfully: {loaded}")

api_key = os.getenv("GEMINI_API_KEY")
print(f"API key found: {bool(api_key)}")

def get_qa_chain():
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    client = QdrantClient(url="http://localhost:6333")
    vector_store = Qdrant(
        client=client, 
        collection_name="flowdesk_docs", 
        embeddings=embeddings
    )
    
    llm = ChatGoogleGenerativeAI(
        model="gemini-3-flash-preview", 
        google_api_key=api_key,  # Pass it explicitly here
        temperature=0.1
    )
    
    # Memory setup
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key='answer'
    )

    # Creating the chain
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
        return_source_documents=True,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": QA_PROMPT}
    )
    
    return chain

if __name__ == "__main__":
    # Test call
    try:
        chain = get_qa_chain()
        print("✅ Chain initialized successfully!")
        test_res = chain.invoke({"question": "How do I invite a team member?"})
        print(test_res['answer'])
    except Exception as e:
        print(f"❌ Error: {e}")