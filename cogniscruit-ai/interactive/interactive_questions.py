import logging
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from ai_tools.model_selector import get_llm
from database.mongo_client import append_followup 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_followup_questions_api(payload: dict) -> dict:
    """
    Generates follow-up interview questions based on user-defined style and subtopic.
    Args:
        payload (dict): Must include 'style', 'subtopic', optionally 'record_id'
    Returns:
        dict: {
            "questions": [...],
            "style": "...",
            "subtopic": "...",
            "record_id": "..."
        }
    """
    style = payload.get("style", "coding")
    subtopic = payload.get("subtopic", "general")
    record_id = payload.get("record_id")

    logger.info("Generating follow-up questions: Style=%s, Subtopic=%s", style, subtopic)

    prompt = PromptTemplate(
        input_variables=["style", "subtopic"],
        template=(
            "You are an AI interview assistant. Generate 5 challenging {style} interview questions "
            "focused on the topic: {subtopic}.\n\n"
            "Questions:"
        )
    )

    llm = get_llm()
    chain = LLMChain(llm=llm, prompt=prompt)

    try:
        questions_text = chain.run({
            "style": style,
            "subtopic": subtopic
        }).strip()
        questions = [q.strip() for q in questions_text.split("\n") if q.strip()]
    except Exception as e:
        logger.error("Error generating follow-up questions: %s", e)
        questions = [f"Error: {str(e)}"]

    # Store to MongoDB (optional)
    append_followup(record_id=record_id, style=style, subtopic=subtopic, questions=questions)

    return {
        "questions": questions,
        "style": style,
        "subtopic": subtopic,
        "record_id": record_id
    }

if __name__ == "__main__":
    test_payload = {
        "style": "behavioral",
        "subtopic": "conflict resolution",
        "record_id": "66421c8ef19cfbbb42e75b12"
    }
    result = generate_followup_questions_api(test_payload)
    print(result)