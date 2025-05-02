
from duckduckgo_search import ddg
def web_answer(query):
    results = ddg(query, max_results=1)
    if results:
        return results[0]['body']
    return "Maaf, aku tidak menemukan informasi yang kamu cari."
