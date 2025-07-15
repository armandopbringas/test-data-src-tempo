
import { createClient } from 'contentful';

// Use process.env variables for configuration (works in both server and client)
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'vlp0dhcdis5o';
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

// Add validation for required environment variables
if (!ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is required. Please add it to your .env file.');
}

// Create Contentful client using SDK
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
});


export default contentfulClient;
