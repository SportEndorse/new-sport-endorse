"use client";
import React, { useEffect, useState, useMemo } from "react";

import "../styles/successStories.css";
import { useLanguage } from "../context/LanguageContext";
import { useWordPressData } from "../context/WordPressDataContext";
import { useTranslation } from "../hooks/useTranslation";
import translations from "../utils/translations";
import Link from "next/link";

function decodeHtmlEntities(text: string) {
  if (!text) return text;
  const entities: Record<string, string> = {
    "&#038;": "&",
    "&#8217;": "'",
    "&#8216;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#8211;": "–",
    "&#8212;": "—",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " "
  };
  let decodedText = text;
  for (const [entity, replacement] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, "g"), replacement);
  }
  return decodedText;
}

// Hook to get responsive visible count
function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1); // Mobile: 1 story
      } else if (width < 1080) {
        setVisibleCount(2); // Tablet: 2 stories
      } else {
        setVisibleCount(3); // Desktop: 3 stories
      }
    }

    // Set initial count
    updateVisibleCount();

    // Listen for resize events
    window.addEventListener('resize', updateVisibleCount);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  return visibleCount;
}

// Loading skeleton component
function LoadingCard() {
  return (
    <div className="success-card" style={{ opacity: 0.7 }}>
      <div style={{ 
        width: '100%', 
        height: '180px', 
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '1rem 1rem 0 0'
      }} />
      <div className="success-info">
        <div style={{ 
          height: '20px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          width: '80%'
        }} />
        <div style={{ 
          height: '16px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.25rem',
          width: '100%'
        }} />
        <div style={{ 
          height: '16px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          width: '60%'
        }} />
        <div style={{ 
          height: '14px', 
          background: '#0078c1', 
          borderRadius: '4px', 
          width: '100px',
          marginTop: '0.5rem'
        }} />
      </div>
    </div>
  );
}

const MAX_STORIES = 8; // Limit to 8 most recent stories

export default function SuccessStories() {
  const { language } = useLanguage();
  const t = translations[language].components.successStories;
  const { successStories: stories, fetchFirstSuccessStories } = useWordPressData();
  const { translatePosts } = useTranslation();
  const [startIdx, setStartIdx] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [translatedStories, setTranslatedStories] = useState<typeof stories>([]);
  const visibleCount = useVisibleCount();

  // Fetch first 8 stories (limit to most recent)
  useEffect(() => {
    let mounted = true;
    
    const loadStories = async () => {
      // Fetch first 8 stories (we only need 8 for the carousel)
      const fetchedStories = await fetchFirstSuccessStories(MAX_STORIES);
      if (mounted && fetchedStories.length > 0) {
        setInitialLoadComplete(true);
      }
    };
    
    loadStories();
    
    return () => {
      mounted = false;
    };
  }, [fetchFirstSuccessStories]);

  // Limit stories to 8 most recent (memoized to prevent infinite loops)
  const limitedStories = useMemo(() => stories.slice(0, MAX_STORIES), [stories]);

  // Reset startIdx if it's out of bounds when visibleCount changes
  useEffect(() => {
    if (limitedStories.length > 0 && startIdx > Math.max(0, limitedStories.length - visibleCount)) {
      setStartIdx(Math.max(0, limitedStories.length - visibleCount));
    }
  }, [visibleCount, limitedStories.length, startIdx]);

  // Translate success stories when language changes or stories are loaded
  useEffect(() => {
    if (limitedStories && limitedStories.length > 0 && language !== 'en') {
      // Translate all 8 stories (or fewer if less available)
      const storiesToTranslate = limitedStories
        .filter(story => story.slug && story.title?.rendered) // Only translate stories with required fields
        .map(story => ({
          slug: story.slug,
          title: story.title || { rendered: '' },
          excerpt: story.excerpt || { rendered: '' },
          yoast_head_json: story.yoast_head_json ? { description: story.yoast_head_json.description } : undefined,
          success_stories_bottom_description: story.success_stories_bottom_description,
        }));
      
      if (storiesToTranslate.length === 0) {
        return; // No valid stories to translate
      }
      
      translatePosts(storiesToTranslate, 'success_story').then((translated) => {
        if (translated.length > 0) {
          // Create a map of translated stories by slug for efficient lookup
          const translatedMap = new Map(
            translated.map((t, idx) => [storiesToTranslate[idx].slug, t])
          );
          
          const updatedStories = limitedStories.map((story) => {
            const translatedStory = translatedMap.get(story.slug);
            if (translatedStory) {
              return {
                ...story,
                title: translatedStory.title,
                excerpt: translatedStory.excerpt,
                ...(translatedStory.yoast_head_json?.description && {
                  yoast_head_json: {
                    ...story.yoast_head_json,
                    description: translatedStory.yoast_head_json.description,
                  }
                }),
                ...(translatedStory.success_stories_bottom_description && {
                  success_stories_bottom_description: translatedStory.success_stories_bottom_description
                }),
              };
            }
            return story;
          });
          setTranslatedStories(updatedStories);
        }
      });
    } else if (language === 'en') {
      // Only clear if there are translated stories to avoid unnecessary updates
      setTranslatedStories((prev) => prev.length > 0 ? [] : prev);
    }
  }, [limitedStories, language, translatePosts]);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setStartIdx((prev) => Math.min(limitedStories.length - visibleCount, prev + 1));
  };

  // Use translated stories if available, otherwise use original (limited to 8)
  const displayStories = translatedStories.length > 0 ? translatedStories : limitedStories;
  const visibleStories = displayStories.length > 0 
    ? displayStories.slice(startIdx, startIdx + visibleCount)
    : [];

  // Show loading skeletons if we don't have initial stories yet
  const showSkeletons = !initialLoadComplete && visibleStories.length === 0;
  const skeletons = Array(visibleCount).fill(null);

  return (
    <section className="success-stories">
      <h3 className="success-stories-title">{t.title}</h3>
      <p>{t.subtitle}</p>
      <div className="stories-carousel-container">
        <button
          className="carousel-arrow left"
          onClick={handlePrev}
          disabled={startIdx === 0 || showSkeletons}
          aria-label="Previous stories"
        >
          &#8592;
        </button>
        <div className="stories-scroll">
          {showSkeletons ? (
            skeletons.map((_, i) => <LoadingCard key={`skeleton-${i}`} />)
          ) : limitedStories.length === 0 ? (
            <div>{t.noStories}</div>
          ) : (
            visibleStories.map((story, i) => {
              // Find corresponding original story for image URL (images don't need translation)
              const originalStory = limitedStories.find(s => s.id === story.id) || story;
              
              return (
                <div className={`success-card${i === Math.floor(visibleCount / 2) ? " active" : " faded"}`} key={story.id}>
                  {originalStory.yoast_head_json?.og_image?.[0]?.url && (
                    <img
                      src={originalStory.yoast_head_json.og_image[0].url}
                      alt={decodeHtmlEntities(story.title.rendered)}
                      width="300"
                      height="200"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="success-info">
                    <p className="success-title">{decodeHtmlEntities(story.title?.rendered || '')}</p>
                    <p className="success-text">
                      {story.yoast_head_json?.description 
                        ? decodeHtmlEntities(story.yoast_head_json.description).slice(0, 250) + (story.yoast_head_json.description.length > 250 ? '...' : '')
                        : story.success_stories_bottom_description 
                          ? decodeHtmlEntities(story.success_stories_bottom_description).replace(/<[^>]*>/g, '').slice(0, 250) + (story.success_stories_bottom_description.length > 250 ? '...' : '')
                          : story.excerpt?.rendered
                            ? decodeHtmlEntities(story.excerpt.rendered).replace(/<[^>]*>/g, '').slice(0, 250) + (story.excerpt.rendered.length > 250 ? '...' : '')
                            : "No summary available."}
                    </p>
                    <Link className="read-more" href={language === 'en' ? "/success_stories" : `/${language}/success_stories`}>{t.readMore}</Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <button
          className="carousel-arrow right"
          onClick={handleNext}
          disabled={startIdx >= Math.max(0, limitedStories.length - visibleCount) || showSkeletons}
          aria-label="Next stories"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}