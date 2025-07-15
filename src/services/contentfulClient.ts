
// Use import.meta.env variables for configuration (Vite)
const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID || '';
const ACCESS_TOKEN = import.meta.env.CONTENTFUL_ACCESS_TOKEN || '';
const ENVIRONMENT = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';

// Construct the GraphQL endpoint URL
const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

/**
 * Execute a GraphQL query against Contentful
 *
 * @param query - GraphQL query string
 * @param variables - Optional variables for the query
 * @returns Promise with the query results
 */
export async function executeQuery<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    if (variables) {
      console.log('With variables:', JSON.stringify(variables, null, 2));
    }

    const response = await fetch(CONTENTFUL_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Get the response text first for debugging
    const responseText = await response.text();

    if (!response.ok) {
      console.error('GraphQL request failed with status:', response.status);
      console.error('Response body:', responseText);
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    // Parse JSON after getting the text
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON response:', responseText);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      throw new Error(
        `GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`
      );
    }

    return data.data as T;
  } catch (error) {
    console.error('GraphQL query error:', error);
    throw error;
  }
}

/**
 * Test query to verify the connection to Contentful
 * Returns basic schema information
 */
export async function testConnection() {
  const query = `
    {
      __typename
    }
  `;

  return executeQuery(query);
}

export default {
  executeQuery,
  testConnection,
};
