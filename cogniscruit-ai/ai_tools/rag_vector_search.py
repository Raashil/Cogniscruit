from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from ai_tools.embedding_selector import get_embedding_model
from database.mongo_client import get_mongo_collection
import hashlib

def generate_doc_id(content: str) -> str:
    """Generate a unique hash ID based on the content to prevent duplicate storage."""
    return hashlib.md5(content.encode("utf-8")).hexdigest()

def store_and_index_documents(resume_text: str, jd_text: str):
    """
    Split the resume and job description texts and store them in a vector index, 
    while attempting to store the documents in the database (if the returned collection supports find_one).
    If get_mongo_collection() returns a list (simulation), skip the database check.
    """
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = [Document(page_content=chunk, metadata={"source": "resume"}) for chunk in text_splitter.split_text(resume_text)]
    docs += [Document(page_content=chunk, metadata={"source": "job_description"}) for chunk in text_splitter.split_text(jd_text)]

    collection = get_mongo_collection()
    # If the collection supports the find_one method, execute database storage
    if hasattr(collection, "find_one"):
        for doc in docs:
            doc_id = generate_doc_id(doc.page_content)
            if not collection.find_one({"_id": doc_id}):
                collection.insert_one({
                    "_id": doc_id,
                    "content": doc.page_content,
                    "source": doc.metadata["source"]
                })
    else:
        # Simulated version prints a prompt instead of actual storage
        print("Simulated database: Skipping real storage operation.")

    # Create FAISS vector index
    embedding = get_embedding_model()
    vectorstore = FAISS.from_documents(docs, embedding=embedding)
    return vectorstore

def match_relevance(resume_text: str, jd_text: str, query: str = None) -> list[str]:
    """
    Perform semantic matching using FAISS and the embedding model, returning the most relevant text blocks 
    that match the job description.
    """
    index = store_and_index_documents(resume_text, jd_text)
    if not query:
        query = "What are the key matching skills and experiences for this job?"
    results = index.similarity_search(query, k=3)
    return [doc.page_content for doc in results]

# Manual test
if __name__ == "__main__":
    sample_resume = "Experienced Python developer with expertise in Flask and MongoDB."
    sample_jd = "We are looking for a backend engineer skilled in Python, Flask, and database management."
    matches = match_relevance(sample_resume, sample_jd)
    print("Top semantic matches:")
    for match in matches:
        print(match)