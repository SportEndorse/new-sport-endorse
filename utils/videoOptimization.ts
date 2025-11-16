/**
 * Video Optimization Utilities
 * Handles efficient video loading and format selection
 */

export const VIDEO_FORMATS = {
  mobile: {
    webm: "/videos/9_16_aspect_ratio_mobile.webm",
    mp4: "/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV",
    poster: "/images/video-poster-mobile.jpg",
    width: 480,
    height: 854
  },
  tablet: {
    webm: "/videos/3_4_aspect_ratio_tablet.webm", 
    mp4: "/videos/3_4 aspect ratio (in between).MOV",
    poster: "/images/video-poster-tablet.jpg",
    width: 768,
    height: 1024
  },
  desktop: {
    webm: "/videos/4_3_aspect_ratio_wide.webm",
    mp4: "/videos/4_3 aspect ratio (wide) .MOV",
    poster: "/images/video-poster-wide.jpg",
    width: 1920,
    height: 1440
  }
};

/**
 * Get optimal video format based on screen size and browser support
 */
export function getOptimalVideoSource(screenWidth: number) {
  let format;
  
  if (screenWidth <= 480) {
    format = VIDEO_FORMATS.mobile;
  } else if (screenWidth <= 768) {
    format = VIDEO_FORMATS.tablet;
  } else {
    format = VIDEO_FORMATS.desktop;
  }
  
  return format;
}

/**
 * Check WebM support
 */
export function supportsWebM(): boolean {
  if (typeof window === 'undefined') return false;
  
  const video = document.createElement('video');
  return video.canPlayType('video/webm') !== '';
}

/**
 * Preload video with optimal format
 */
export function preloadVideo(src: string, format: 'webm' | 'mp4' = 'webm'): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadeddata = () => resolve();
    video.onerror = reject;
    video.src = src;
    video.load();
  });
}

/**
 * Create responsive video sources array
 */
export function createVideoSources(format: typeof VIDEO_FORMATS.desktop) {
  return [
    { src: format.webm, type: 'video/webm' },
    { src: format.mp4, type: 'video/mp4' }
  ];
}