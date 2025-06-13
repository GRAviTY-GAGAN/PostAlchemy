from tavily import TavilyClient
from functools import lru_cache
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel
import json, re, os

@lru_cache()
def get_llm() -> ChatGoogleGenerativeAI:
    apiKey = os.getenv("gemini_api_key")
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001", google_api_key=apiKey)
    return llm

async def getPolishedPosts(draft):
    final_post_prompt = ChatPromptTemplate.from_template("""
    Polish these social media posts to better match their platform's tone:

    - LinkedIn: Professional, informative
    - Twitter: Under 280 characters, punchy
    - Instagram: Friendly, emoji-friendly

    remove unneccasry characters, just keep the content which I have to show in my frontend.

    Response should have below fields:
    1. platform: A string specifying the platform name. Example: "LinkedIn", "Twitter", or "Instagram".

    2. content: Post text appropriate for the platform. Make sure to include hashtags here aswell in the new line.

    3. hashtags: An array of relevant hashtags for the post. Minimum of 4, maximum of 10 (more is acceptable).

    Here are the drafts to polish:

    {drafts}
    """)

    llm = get_llm()
    final_post_chain = final_post_prompt | llm
    response = final_post_chain.invoke({"drafts": draft})

     # Extract JSON from markdown-like string
    match = re.search(r'```json\n(.*?)```', response.content, re.DOTALL)
    if match:
        parsed_response = json.loads(match.group(1))
    else:
        # fallback if it's already a plain JSON string
        parsed_response = json.loads(response.content)

    return parsed_response


async def performWebSearch(userInput):
    tavilyKey = os.getenv('tavily_key')
    client = TavilyClient(tavilyKey)
    response = client.search(userInput.input,max_results=5)
    return response.get("results")

async def summariseWebSearch(web_results):

    
    # prompt = f"""You are an expert researcher. Based on the following search results, generate a concise and informative summary for the user. Include only the most relevant and accurate information. Avoid repetition. 

    # Search Results:
    # {web_results}

    # Final Summary:"""


    # response = llm.invoke(prompt)
    # print(f"Gemini Response: {response.content}")


    # instead of the above we can chain the search content to llm itself
    summaryPrompt = ChatPromptTemplate.from_template('''
    You are an expert researcher. Based on the following search results, generate a concise and informative summary for the user. Include only the most relevant and accurate information. Avoid repetition. 

    Search Results:
    {web_results}

    Final Summary:
    ''')
    llm = get_llm()
    summaryChain = summaryPrompt | llm
    response = summaryChain.invoke({"web_results":web_results})
    return response.content

async def generateDraft(summary):
    linkedin_prompt = ChatPromptTemplate.from_template("""
    You are a social media manager.

    Write a professional LinkedIn post based on this summary:
    {summary}
    """)

    twitter_prompt = ChatPromptTemplate.from_template("""
    You are a social media expert.

    Write a catchy Twitter post under 280 characters based on this summary:
    {summary}
    """)

    instagram_prompt = ChatPromptTemplate.from_template("""
    You are a fun and casual content creator.

    Write an Instagram caption using emojis and friendly tone based on this summary:
    {summary}
    """)


    llm = get_llm()
    linkedin_chain = linkedin_prompt | llm
    twitter_chain = twitter_prompt | llm
    instagram_chain = instagram_prompt | llm

    parallel_chain = RunnableParallel({
        "LinkedIn" : linkedin_chain,
        "Twitter" : twitter_chain,
        "Instagram" : instagram_chain
    })

    response = parallel_chain.invoke({'summary': summary})
    draft = {
        "linkedin_post":response['LinkedIn'].content,
        "twitter_post": response['Twitter'].content,
        "instagram_post": response['Instagram'].content
    }
    
    return draft