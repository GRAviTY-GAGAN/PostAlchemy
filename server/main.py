from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from utils import performWebSearch, summariseWebSearch, generateDraft, getPolishedPosts

app = FastAPI()
load_dotenv()

class UserInput(BaseModel):
    input: str

@app.post("/query")
async def userQuery(userInput: UserInput):
        webSearchResponse = await performWebSearch(userInput)
        
        allSummary = ''
        for result in webSearchResponse:
            allSummary += result.get("content")
        
        summarisedResponse = await summariseWebSearch(webSearchResponse)
        draftResponse = await generateDraft(summarisedResponse)
        polishedPosts = await getPolishedPosts(draftResponse)

        return {"polishedPosts": polishedPosts, "summary": summarisedResponse}

@app.get("/")
async def root():
    return "Welcome to PostAlchemy"