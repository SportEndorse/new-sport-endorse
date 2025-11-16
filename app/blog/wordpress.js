
const API_URL = 'https://www.sportendorse.com/wp-json/wp/v2'

export async function getAllPosts() {
  try {
    let allPosts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(`${API_URL}/posts?_embed&page=${page}`, {
        next: { revalidate: 86400 }, // ISR with App Router - 24 hours
        headers: {
          'User-Agent': 'NextJS-App'
        }
      });

      if (!res.ok) {
        if (res.status === 404) {
          // No more pages available
          hasMore = false;
          break;
        }
        console.warn(`WordPress API error: ${res.status}`);
        // Return empty array instead of throwing during build
        return [];
      }

    const posts = await res.json();
    
    // If no posts returned or empty array, we've reached the end
    if (!posts || posts.length === 0) {
      hasMore = false;
      break;
    }

    allPosts = allPosts.concat(posts);
    page++;

    // Check if there are more pages using the X-WP-TotalPages header
    const totalPages = res.headers.get('X-WP-TotalPages');
    if (totalPages && page > parseInt(totalPages)) {
      hasMore = false;
    }
    }

    return allPosts;
  } catch (error) {
    console.warn('WordPress API getAllPosts error:', error);
    // Return empty array instead of throwing during build
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'NextJS-App'
      }
    });
    
    if (!res.ok) {
      console.warn(`WordPress API getPostBySlug error: ${res.status}`);
      return null;
    }
    
    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.warn('WordPress API getPostBySlug error:', error);
    return null;
  }
}