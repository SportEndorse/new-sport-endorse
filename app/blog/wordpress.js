
const API_URL = 'https://www.sportendorse.com/wp-json/wp/v2'

export async function getAllPosts() {
  let allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${API_URL}/posts?_embed&page=${page}`, {
      next: { revalidate: 86400 } // ISR with App Router - 24 hours
    });

    if (!res.ok) {
      if (res.status === 404) {
        // No more pages available
        hasMore = false;
        break;
      }
      throw new Error('Failed to fetch posts');
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
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 86400 }
  })
  if (!res.ok) throw new Error('Failed to fetch post')
  const posts = await res.json()
  return posts[0]
}