// Helper functions for WordPress content formatting

/**
 * Utility function to extract plain text from HTML
 * @param html - HTML string
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Utility function to format date
 * @param dateString - ISO date string
 * @returns Formatted date
 */
export function formatDate(dateString: string): string {
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
 * @param content - Full content
 * @param maxLength - Maximum length of excerpt
 * @returns Excerpt
 */
export function createExcerpt(content: string, maxLength: number = 150): string {
  if (!content) return '';
  const plainText = stripHtml(content);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

