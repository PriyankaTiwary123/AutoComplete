export const BASE_URL: string = 'https://api.thedogapi.com/v1/breeds/search';

export const headers: Record<string, string> = {
    'dog-api-key': process.env.dogApiKey || '', // Assuming dogApiKey is a string
  };
