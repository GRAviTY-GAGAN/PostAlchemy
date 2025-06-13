from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from utils import performWebSearch, summariseWebSearch, generateDraft, getPolishedPosts
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use ["*"] to allow all origins (not recommended in production)
    allow_credentials=True,
    allow_methods=["*"],     # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allows all headers
)

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