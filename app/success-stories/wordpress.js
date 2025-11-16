//wordpress.js

const API_URL = 'https://www.sportendorse.com/wp-json/wp/v2'

export async function getAllSuccessStories() {
  console.log('🚀 getAllSuccessStories: Starting fetch...');
  
  let allStories = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      console.log(`� Fetching page ${page}...`);
      
      // Try the main endpoint first
        let res = await fetch(`${API_URL}/success_stories?_embed&page=${page}`, {
          next: { revalidate: 86400 }
        });      console.log(`� Main endpoint response status for page ${page}:`, res.status);
      
      // If main endpoint fails, try alternatives (same as working component)
      if (!res.ok) {
        console.log('🔄 Main endpoint failed, trying alternatives...');
        const alternatives = [
          `${API_URL}/success-stories?_embed&page=${page}`,
          `${API_URL}/successstories?_embed&page=${page}`,
          `${API_URL}/posts?_embed&page=${page}`,
          `${API_URL}/success?_embed&page=${page}`
        ];
        
        for (const altEndpoint of alternatives) {
          console.log(`🔄 Trying: ${altEndpoint}`);
          try {
            const altRes = await fetch(altEndpoint, {
              next: { revalidate: 86400 }
            });
            if (altRes.ok) {
              console.log(`✅ Alternative worked: ${altEndpoint}`);
              res = altRes;
              break;
            } else {
              console.log(`❌ Alternative failed with status: ${altRes.status}`);
            }
          } catch (altError) {
            console.log(`❌ Alternative errored:`, altError);
          }
        }
      }

      console.log(`📊 Final response status for page ${page}:`, res.status);

      if (!res.ok) {
        if (res.status === 404) {
          console.log(`❌ No more pages available (404 on page ${page})`);
          hasMore = false;
          break;
        }
        console.warn(`❌ Failed to fetch success stories page ${page}: ${res.status}`);
        hasMore = false;
        break;
      }

      const stories = await res.json();
      console.log(`📝 Raw stories data for page ${page}:`, stories);
      console.log(`📊 Stories count for page ${page}:`, stories?.length || 0);
      
      // If no stories returned or empty array, we've reached the end
      if (!stories || stories.length === 0) {
        console.log(`✋ No more stories found on page ${page}`);
        hasMore = false;
        break;
      }

      // Filter out stories that might cause issues - but be more lenient
      const validStories = stories.filter(story => {
        try {
          const hasBasicFields = (
            story &&
            typeof story === 'object' &&
            story.slug &&
            story.title &&
            story.title.rendered
          );
          
          // Log what we're checking
          if (!hasBasicFields) {
            console.warn(`❌ Filtering out story missing basic fields:`, {
              hasStory: !!story,
              hasSlug: !!story?.slug,
              hasTitle: !!story?.title?.rendered,
              storyId: story?.id
            });
          } else {
            console.log(`✅ Story passed basic validation:`, {
              id: story.id,
              title: story.title.rendered,
              slug: story.slug,
              hasContent: !!story?.content?.rendered,
              hasYoastDescription: !!story?.yoast_head_json?.og_title
            });
          }
          
          return hasBasicFields;
        } catch (error) {
          console.warn(`❌ Error filtering story:`, error);
          return false;
        }
      });

      console.log(`✅ Valid stories for page ${page}:`, validStories.length);
      allStories = allStories.concat(validStories);
      page++;

      // Check if there are more pages using the X-WP-TotalPages header
      const totalPages = res.headers.get('X-WP-TotalPages');
      console.log(`📄 Total pages from header:`, totalPages);
      if (totalPages && page > parseInt(totalPages)) {
        console.log(`🛑 Reached total pages limit: ${totalPages}`);
        hasMore = false;
      }
    } catch (error) {
      console.warn(`❌ Error fetching success stories page ${page}:`, error);
      hasMore = false;
      break;
    }
  }

  console.log(`🎉 Final result: ${allStories.length} total success stories`);
  console.log(`📋 Final stories summary:`, allStories.map(s => ({ id: s.id, title: s.title.rendered, slug: s.slug })));
  return allStories;
}

export async function getSuccessStoryBySlug(slug) {
  try {
    console.log(`🔍 Fetching individual story with slug: "${slug}"`);
    
    // Try the main endpoint first
    let res = await fetch(`${API_URL}/success_stories?slug=${slug}&_embed`, {
      next: { revalidate: 86400 }
    });
    
    console.log(`📊 Main endpoint response status for slug "${slug}":`, res.status);
    
    // If main endpoint fails, try alternatives (same as the working list endpoint)
    if (!res.ok) {
      console.log(`🔄 Main endpoint failed for slug "${slug}", trying alternatives...`);
      const alternatives = [
        `${API_URL}/success-stories?slug=${slug}&_embed`,
        `${API_URL}/successstories?slug=${slug}&_embed`,
        `${API_URL}/posts?slug=${slug}&_embed`,
        `${API_URL}/success?slug=${slug}&_embed`
      ];
      
      for (const altEndpoint of alternatives) {
        console.log(`🔄 Trying: ${altEndpoint}`);
        try {
          const altRes = await fetch(altEndpoint, {
            next: { revalidate: 86400 }
          });
          if (altRes.ok) {
            console.log(`✅ Alternative worked for slug "${slug}": ${altEndpoint}`);
            res = altRes;
            break;
          } else {
            console.log(`❌ Alternative failed with status: ${altRes.status}`);
          }
        } catch (altError) {
          console.log(`❌ Alternative errored:`, altError);
        }
      }
    }
    
    if (!res.ok) {
      console.warn(`❌ Failed to fetch success story "${slug}": ${res.status}`);
      return null;
    }
    
    const stories = await res.json();
    const story = stories[0];
    
    console.log(`📋 Story data for slug "${slug}":`, story ? {
      id: story.id,
      title: story.title?.rendered,
      slug: story.slug,
      hasContent: !!story.content?.rendered,
      hasYoastData: !!story.yoast_head_json
    } : 'No story found');
    
    // Use the same relaxed validation as the listing page - only require basic fields
    if (!story || !story.title || !story.title.rendered) {
      console.warn(`❌ Success story "${slug}" is missing required basic fields`);
      return null;
    }
    
    console.log(`✅ Successfully fetched story "${slug}"`);
    return story;
  } catch (error) {
    console.warn(`❌ Error fetching success story "${slug}":`, error);
    return null;
  }
}