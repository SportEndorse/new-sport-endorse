'use client';

import { useState, useEffect, useRef } from 'react';
import '../styles/talentReviews.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function TalentReviews() {
  const { language } = useLanguage();
  const t = translations[language].components.talentReviews;
  const reviews = t.reviews;

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [reviews.length]);

  const handlePrevClick = () => {
    resetInterval();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleNextClick = () => {
    resetInterval();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="talent-reviews">
      <div className="talent-reviews-container">
        <div className="talent-reviews-header">
          {/*<div className="talent-quote-icon">"</div>*/}
          <h3>{t.title}</h3>
          <p>
            {t.subtitle}
          </p>
        </div>

        <div className="talent-review-card">
          <div className="talent-review-image">
            <img src={currentReview.image} alt={currentReview.alt} />
          </div>
          <div className="talent-review-text">
            <p>"{currentReview.quote}"</p>
          </div>
          <div className="talent-review-author">
            <h4>{currentReview.talentName}</h4>
            <p>{currentReview.sport.toUpperCase()} | {currentReview.region.toUpperCase()}</p>
          </div>
        </div>

        <div className="talent-review-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`talent-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="talent-review-navigation">
          <button 
            className="talent-nav-arrow prev"
            onClick={handlePrevClick}
          >
            ←
          </button>
          <button 
            className="talent-nav-arrow next"
            onClick={handleNextClick}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}