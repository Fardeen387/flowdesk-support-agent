import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient

# 1. Setup paths and Config
DATA_PATH = "../knowledge_base"
COLLECTION_NAME = "flowdesk_docs"

# 2. Initialize Embeddings 
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def run_ingestion():
    # --- STEP 1: Load Data ---
    loader = DirectoryLoader(DATA_PATH, glob="**/*.md", loader_cls=TextLoader)
    documents = loader.load()
    print(f"Loaded {len(documents)} documents.")

    # --- STEP 2: Chunking ---
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=30,
        separators=["\n\n", "\n", " ", ""]
    )
    texts = text_splitter.split_documents(documents)
    print(f"Split into {len(texts)} chunks.")

    # --- STEP 3: Vectorize and Upload to Qdrant ---
    url = "http://localhost:6333"
    
    # Initialize the vector store
    vectorstore = Qdrant.from_documents(
        documents=texts,
        embedding=embeddings,
        url=url,
        collection_name=COLLECTION_NAME,
        force_recreate=True  
    )
    
    print("Successfully ingested documents into Qdrant!")

if __name__ == "__main__":
    run_ingestion()
