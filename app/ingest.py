import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader, JSONLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient

# 1. Setup paths and Config
DATA_PATH = "../knowledge_base"
COLLECTION_NAME = "flowdesk_docs"

# 2. Initialize Embeddings (Matches your choice)
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def run_ingestion():
    # --- STEP 1: Load Data ---
    # Using DirectoryLoader to pick up all .txt or .md files in your data folder
    loader = DirectoryLoader(DATA_PATH, glob="**/*.md", loader_cls=TextLoader)
    documents = loader.load()
    print(f"Loaded {len(documents)} documents.")

    # --- STEP 2: Chunking ---
    # Professional RAG uses overlap so context isn't cut off mid-sentence
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        separators=["\n\n", "\n", " ", ""]
    )
    texts = text_splitter.split_documents(documents)
    print(f"Split into {len(texts)} chunks.")

    # --- STEP 3: Vectorize and Upload to Qdrant ---
    # This creates the collection and uploads the vectors + metadata
    url = "http://localhost:6333" # Or your Qdrant Cloud URL
    
    # Initialize the vector store this way to bypass the 'init_from' bug
    vectorstore = Qdrant.from_documents(
        documents=texts,
        embedding=embeddings,
        url=url,
        collection_name=COLLECTION_NAME,
        force_recreate=True  # This wipes the old collection and starts fresh
    )
    
    print("Successfully ingested documents into Qdrant!")

if __name__ == "__main__":
    run_ingestion()