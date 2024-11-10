import axios from "axios";
export const callGraphql =  async (query: string) => {
    try {
        const response = await axios.post(
          'https://sui-devnet.mystenlabs.com/graphql',
          {
            query,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
  
        return response.data; // Return the response data
      } catch (error) {
        console.error('Error making GraphQL API call:', error);
        throw new Error('Failed to make GraphQL call');
      }
}