import axios from 'axios';

const contentUrlMap = {
  user: 'https://json.versant.digital/.netlify/functions/fake-api/user'
};

// Resolver function to retrieve user from API
export const getDataFromApi = async content => {
  try {
    const url = contentUrlMap[content];
    if (!url) {
      throw new Error(`Invalid content received: ${content}`);
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
