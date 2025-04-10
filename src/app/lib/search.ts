import { GoogleCustomSearch } from "@langchain/community/tools/google_custom_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const createSearchTool = () => {
  if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_CSE_ID) {
    throw new Error("Missing required Google API credentials");
  }

  return new GoogleCustomSearch({
    apiKey: process.env.GOOGLE_CSE_API_KEY,
    googleCSEId: process.env.GOOGLE_CSE_ID,
  });
};

export const createSearchChain = () => {
  const searchTool = createSearchTool();
  const model = new ChatGoogleGenerativeAI({
    modelName: process.env.GOOGLE_MODEL!,
    apiKey: process.env.GOOGLE_API_KEY!,
  });

  // Helper function to determine if a search is needed
  const shouldPerformSearch = async (message: string, transactionHistory: any) => {
    const response = await model.invoke([
      new SystemMessage(`You are a search query analyzer. Determine if a web search is needed for the following message.
      Consider the user's transaction history context when making this decision.
      Return ONLY "yes" or "no" based on these criteria:
      - Return "yes" if the query requires current, up-to-date information
      - Return "yes" if the query is about recent events or news
      - Return "yes" if the query is about specific facts or data that might change
      - Return "no" if the query is about general knowledge or concepts
      - Return "no" if the query is about personal advice or opinions
      - Return "no" if the query is about the user's own data or transactions

      User's transaction history context:
      ${JSON.stringify(transactionHistory)}`),
      new HumanMessage(message),
    ]);
    return response.content.toString().trim().toLowerCase() === "yes";
  };

  // Helper function to extract search query from message
  const extractSearchQuery = async (message: string, transactionHistory: any) => {
    const response = await model.invoke([
      new SystemMessage(`You are a search query extractor. Extract the main search query from the following message.
      Consider the user's transaction history context to make the search query more relevant and specific.
      Focus on the key terms that would be most relevant for a web search.
      Return only the search query, nothing else.

      User's transaction history context:
      ${JSON.stringify(transactionHistory)}`),
      new HumanMessage(message),
    ]);
    return response.content.toString().trim();
  };

  // Helper function to format search results
  const formatSearchResults = (results: any) => {
    if (!results) return '';
    return `Here are some relevant search results that might help answer the question:
${results.split('\n').map((result: string, index: number) => 
  `${index + 1}. ${result}`
).join('\n')}`;
  };

  return {
    search: async (message: string, transactionHistory: any) => {
      try {
        // First determine if a search is needed
        const needsSearch = await shouldPerformSearch(message, transactionHistory);
        console.log("Search needed:", needsSearch);
        
        if (!needsSearch) {
          return null;
        }

        // Extract a focused search query
        const searchQuery = await extractSearchQuery(message, transactionHistory);
        console.log("Extracted search query:", searchQuery);
        
        // Perform the search
        const results = await searchTool.invoke(searchQuery);
        console.log("Search results:", results);
        
        // Format the results
        const formattedResults = formatSearchResults(results);
        return formattedResults;
      } catch (error) {
        console.error("Search error details:", {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          message,
        });
        return null;
      }
    },
    model,
  };
}; 