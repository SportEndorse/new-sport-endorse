// wordpress.js - API service for fetching podcasts
const WORDPRESS_API_URL = 'https://www.sportendorse.com/wp-json/wp/v2';

/**
 * Fetch all podcasts from the WordPress API
 * @returns {Promise<Array>} Array of podcast objects
 */
export async function fetchPodcasts() {
  try {
    let allPodcasts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`${WORDPRESS_API_URL}/podcasts?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        next: { 
          revalidate: 86400 // Revalidate every day (24 hours)
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No more pages available
          hasMore = false;
          break;
        }
        throw new Error(`Failed to fetch podcasts: ${response.status}`);
      }

      const podcasts = await response.json();
      
      // If no podcasts returned or empty array, we've reached the end
      if (!podcasts || podcasts.length === 0) {
        hasMore = false;
        break;
      }

      allPodcasts = allPodcasts.concat(podcasts);
      page++;

      // Check if there are more pages using the X-WP-TotalPages header
      const totalPages = response.headers.get('X-WP-TotalPages');
      if (totalPages && page > parseInt(totalPages)) {
        hasMore = false;
      }
    }

    return allPodcasts;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
}

/**
 * Fetch a single podcast by ID
 * @param {number} id - The podcast ID
 * @returns {Promise<Object>} Podcast object
 */
export async function fetchPodcastById(id) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/podcasts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 86400
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast: ${response.status}`);
    }

    const podcast = await response.json();
    return podcast;
  } catch (error) {
    console.error('Error fetching podcast:', error);
    throw error;
  }
}

/**
 * Fetch a single podcast by slug
 * @param {string} slug - The podcast slug
 * @returns {Promise<Object>} Podcast object
 */
export async function getPodcastBySlug(slug) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/podcasts?slug=${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 86400
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast: ${response.status}`);
    }

    const podcasts = await response.json();
    return podcasts[0];
  } catch (error) {
    console.error('Error fetching podcast by slug:', error);
    throw error;
  }
}

/**
 * Utility function to extract plain text from HTML
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Utility function to format date
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Utility function to create excerpt from content
 * @param {string} content - Full content
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} Excerpt
 */
export function createExcerpt(content, maxLength = 150) {
  if (!content) return '';
  const plainText = stripHtml(content);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}
