"use client";
import React, { useEffect, useState } from "react";

import "../styles/successStories.css";
import { useLanguage } from "../context/LanguageContext";
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

type Story = {
  id: number;
  title: { rendered: string };
  slug: string;
  yoast_head_json?: { og_image?: { url: string }[]; description?: string };
  success_stories_bottom_description?: string;
  link: string;
  success_stories_bottom_description?: string;
};

export default function SuccessStories() {
  const { language } = useLanguage();
  const t = translations[language].components.successStories;
  
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = useVisibleCount();

  useEffect(() => {
    async function fetchStories() {
      try {
        console.log('🎯 SuccessStories component: Starting fetch...');
        
        // Try the main endpoint first
        let res = await fetch(
          `https://www.sportendorse.com/wp-json/wp/v2/success_stories?_embed&per_page=10&page=1`
        );
        
        console.log('📊 Main endpoint response status:', res.status);
        
        // If main endpoint fails, try alternatives
        if (!res.ok) {
          console.log('🔄 Main endpoint failed, trying alternatives...');
          const alternatives = [
            "https://www.sportendorse.com/wp-json/wp/v2/success-stories?_embed&per_page=10&page=1",
            "https://www.sportendorse.com/wp-json/wp/v2/successstories?_embed&per_page=10&page=1",
            "https://www.sportendorse.com/wp-json/wp/v2/posts?_embed&per_page=10&page=1",
            "https://www.sportendorse.com/wp-json/wp/v2/success?_embed&per_page=10&page=1"
          ];
          
          for (const altUrl of alternatives) {
            console.log(`🔄 Trying: ${altUrl}`);
            try {
              const altRes = await fetch(altUrl);
              if (altRes.ok) {
                console.log(`✅ Alternative worked: ${altUrl}`);
                res = altRes;
                break;
              }
            } catch (error) {
              console.log(`❌ Alternative failed:`, error);
            }
          }
        }
        
        if (!res.ok) throw new Error("Failed to fetch success stories");
        const data = await res.json();
        console.log('📋 Success stories data received:', data);
        console.log('📊 Stories count:', data?.length || 0);
        setStories(data || []);
      } catch {
        setStories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  // Reset startIdx if it's out of bounds when visibleCount changes
  useEffect(() => {
    if (startIdx > Math.max(0, stories.length - visibleCount)) {
      setStartIdx(Math.max(0, stories.length - visibleCount));
    }
  }, [visibleCount, stories.length, startIdx]);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setStartIdx((prev) => Math.min(stories.length - visibleCount, prev + 1));
  };

  const visibleStories = stories.slice(startIdx, startIdx + visibleCount);

  return (
    <section className="success-stories">
      <h3 className="success-stories-title">{t.title}</h3>
      <p>{t.subtitle}</p>
      <div className="stories-carousel-container">
        <button
          className="carousel-arrow left"
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Previous stories"
        >
          &#8592;
        </button>
        <div className="stories-scroll">
          {loading ? (
            <div>{t.loading}</div>
          ) : stories.length === 0 ? (
            <div>{t.noStories}</div>
          ) : (
            visibleStories.map((story, i) => (
              <div className={`success-card${i === Math.floor(visibleCount / 2) ? " active" : " faded"}`} key={story.id}>
                {story.yoast_head_json?.og_image?.[0]?.url && (
                  <img
                    src={story.yoast_head_json.og_image[0].url}
                    alt={decodeHtmlEntities(story.title.rendered)}
                    width="300"
                    height="200"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="success-info">
                  <p className="success-title">{decodeHtmlEntities(story.title.rendered)}</p>
                  <p className="success-text">
                    {story.yoast_head_json?.description 
                      ? decodeHtmlEntities(story.yoast_head_json.description).slice(0, 250) + (story.yoast_head_json.description.length > 250 ? '...' : '')
                      : story.success_stories_bottom_description 
                        ? decodeHtmlEntities(story.success_stories_bottom_description).replace(/<[^>]*>/g, '').slice(0, 250) + (story.success_stories_bottom_description.length > 250 ? '...' : '')
                        : "No summary available."}
                  </p>
                  <Link className="read-more" href="/success-stories" >{t.readMore}</Link>
                </div>
              );
            })
          )}
        </div>
        <button
          className="carousel-arrow right"
          onClick={handleNext}
          disabled={startIdx >= Math.max(0, stories.length - visibleCount)}
          aria-label="Next stories"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}