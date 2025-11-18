'use client';

import { useState, useEffect, useRef } from 'react';
import '../styles/brandReviews.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function BrandReviews() {
  const { language } = useLanguage();
  const t = translations[language].components.brandReviews;
  const reviews = [
    {
      id: 1,
      image: "/images/shuzgroup_logo-min.png",
      alt: "Shuz Group company logo",
      text: "Sport Endorse has revolutionised the way ShuzGroup approaches sports brand ambassador marketing. This platform has not only simplified the process of connecting with sports talent across the nation but has also given us the freedom to choose the perfect ambassadors for our brand. This platform has truly enhanced our ability to make informed decisions when selecting sports talent and we would gladly recommend Sport Endorse.",
      name: "Rebecca Quinlan",
      position: "Marketing Director at Shuz Group"
    },
    {
      id: 2,
      image: "/images/donal healy-min.png",
      alt: "Donal Healy",
      text: "We were delighted to work with Sport Endorse on campaigns involving both Jack Carty and Jason Quigley - two outstanding sporting ambassadors for the West and North West of Ireland.",
      name: "Donal Healy",
      position: "IRELAND WEST AIRPORT | HEAD OF MARKETING, AVIATION BUSINESS DEVELOPMENT & COMMUNICATIONS"
    },
    {
      id: 3,
      image: "/images/john delves-min.png",
      alt: "John Delves",
      text: "The team at Sport Endorse were a pleasure to work with, they were on hand in the lead up to our photoshoot and on the day were more than accommodatingwith our requests. A great experience all around and one we will no doubt repeat!”",
      name: "John Delves",
      position: "MAGNET +  | MANAGING DIRECTOR"
    },
    {
      id: 4,
      image: "/images/daithi oconnor-min.png",
      alt: "Daithí O'Connor",
      text: "Working with Sport Endorse is a pleasure. We've been very happy with the partnerships we've secured and look forward to driving our business  in the UK with help from the platform.",
      name: "Daithí O'Connor",
      position: "REVIVE ACTIVE | MD & FOUNDER"
    },
    {
      id: 5,
      image: "/images/perform_nutrition-min.png",
      alt: "Perfom nutrition logo",
      text: "Sport Endorse is doing fantastic work in looking after athletes and helping them achieve their potential on and off the field. We are delighted to work with the Sport Endorse team to secure brand partnerships that, without them, would not have been possible.",
      name: "Aoife Cassidy",
      position: "Marketing Executive"
    },
    {
      id: 6,
      image: "/images/homePageTable/solestar.png",
      alt: "Solestar logo",
      text: "Sport Endorse is a great platform for connecting with brand ambassadors! It's always a plus when a platform is not only effective but also easy to use and has helpful support staff.",
      name: "Jelena Jelic",
      position: "Key Account Manager"
    },
    {
      id: 7,
      image: "/images/skins_logo.webp",
      alt: "Skins logo",
      text: "Sport Endorse provides brands a user-friendly channel to connect with influencers of various sports. Through this platform, I can create different contents with influencers to enhance our brand awareness!",
      name: "Mavis Leung",
      position: "Brand manager"
    },
    {
      id: 8,
      image: "/images/homePageTable/Specsaver.png",
      alt: "Specsavers logo",
      text: "We've been working with Sport Endorse for over two seasons now around activation of the Specsavers, and simply put, they get things done when others may say it isn't possible.",
      name: "Filsan Yusuf",
      position: "Senior Digital Account Director"
    },
    {
      id: 9,
      image: "/images/homePageTable/shokz-min.png",
      alt: "Shokz logo",
      text: "The collaboration with Dan Tai for the Shokz OpenFit 2+ campaign went really well. It was a pleasure working with him and Sport Endorse. Dan's professionalism and the authenticity of his content truly resonated with our audience, and we saw great engagement from his posts.",
      name: "Victoria Liu",
      position: "UK Influencer Marketing Manager, International Sales Department"
    },
    {
      id: 10,
      image: "/images/homePageTable/affidea-min.jpg",
      alt: "Affidea logo",
      text: "Working with Declan and the team at Sport Endorse has been an absolute pleasure. They have a clear understanding of our business and how to match a suitable Ambassador to fit our brand. They are forthcoming with advice and suggestions to help you maximise your agreement with your chosen athlete. I would highly recommend them!",
      name: "Muireann Feirteir",
      position: "Head of Business Development & Marketing"
    },
    {
      id: 11,
      image: "/images/homePageTable/active-iron-min.png",
      alt: "Active Iron logo",
      text: "Sport Endorse were instrumental in sourcing the right talent to communicate our message across multiple channels. They made the process easy, professional, and cost-effective.",
      name: "Claire Lynch",
      position: "Head of Marketing"
    }

  ];

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
    <section className="brand-reviews">
      <div className="reviews-container">
        <div className="reviews-header">
          {/*<div className="quote-icon">"</div>*/}
          <h3>{t.title}</h3>
          <p>
            {t.subtitle}
          </p>
        </div>

        <div className="review-card">
          <div className="review-image">
            <img src={currentReview.image} alt={currentReview.alt} />
          </div>
          <div className="review-text">
            <p>"{currentReview.text}"</p>
          </div>
          <div className="review-author">
            <h4>{currentReview.name}</h4>
            <p>{currentReview.position}</p>
          </div>
        </div>

        <div className="review-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="review-navigation">
          <button 
            className="nav-arrow prev"
            onClick={handlePrevClick}
          >
            ←
          </button>
          <button 
            className="nav-arrow next"
            onClick={handleNextClick}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}