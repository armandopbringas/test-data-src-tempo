
/**
 * Contentful Service
 *
 * Provides methods to interact with Contentful using SDK
 */
import { contentfulClient } from './contentfulClient';

/**
 * Get homepage entry by content type (more flexible)
 */
export async function getHomepage() {
  try {
    // Get the homepage entry by content type with linked entries resolved
    const entries = await contentfulClient.getEntries({
      content_type: 'homepage',
      limit: 1,
      include: 10
    });
    
    if (entries.items.length === 0) {
      throw new Error('No homepage entry found');
    }
    
    return entries.items[0];
  } catch (error) {
    console.error('Error fetching homepage:', error);
    throw error;
  }
}

export default {
  getHomepage
};
