"use client";

import BenefitSection from "./BenefitSection";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import "../styles/home.css";
import "../styles/benefitSection.css";
import "../styles/featuredTalents.css";
import FeaturedTalents from "@/components/FeaturedTalents";
import AppStores from "@/components/AppStores";
import BrandsGrid from "@/components/BrandsGrid";
import { useState, useEffect } from "react";

export default function HomeContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState<'small' | 'medium' | 'large'>('large');

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      
      // Determine screen size for placeholder image
      if (width <= 480) {
        setScreenSize('small'); // Use pic3
      } else if (width <= 768) {
        setScreenSize('medium'); // Use pic1
      } else {
        setScreenSize('large'); // Use pic2
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Optimized video source selection with compressed formats
  const getVideoSource = () => {
    if (!isClient) return "/videos/4_3 aspect ratio (wide) .webm";
    if (window.innerWidth <= 480) {
      return "/videos/9_16 aspect ratio (mobile_reel_tiktok).webm";
    } else if (window.innerWidth <= 768) {
      return "/videos/3_4 aspect ratio (in between).webm";
    } else {
      return "/videos/4_3 aspect ratio (wide) .webm";
    }
  };

   // Get placeholder image based on screen size
  const getPlaceholderImage = () => {
    switch (screenSize) {
      case 'large': // Biggest screens
        return "/images/home-vid-pic2.webp";
      case 'medium': // Middle screens
        return "/images/home-vid-pic1.webp";
      case 'small': // Smallest screens
        return "/images/home-vid-pic3.webp";
      default:
        return "/images/home-vid-pic2.webp";
    }
  };

  const videoSource = getVideoSource();
  const placeholderImage = getPlaceholderImage();

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoLoadStart = () => {
    setIsVideoLoaded(false);
  };

  return (
    <>
      <section className="home-heroSection">
        <div className="home-videoBackground">
          {/* Placeholder image shown while video loads */}
          <img
            key={`placeholder-${screenSize}`}
            src={placeholderImage}
            alt=""
            className="home-videoPlaceholder"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 0,
              opacity: isVideoLoaded ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: 'none',
            }}
          />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="home-backgroundVideo"
            preload="auto"
            src={undefined}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            onLoadStart={handleVideoLoadStart}
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <source src={videoSource} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-title"
              dangerouslySetInnerHTML={{ __html: t.home.welcome }}
            />
            <p className="home-description">
              {t.home.description}
            </p>
          </div>
        </div>
      </section>

      <div className="home-appStoresContainer" style={{display: "flex", justifyContent: "center", padding: "2rem 0"}}>
        <AppStores pageName="home" />
      </div>

      <BrandsGrid variant={isMobile ? "5x4" : "8x4"} label={t.home.tableHeader} />

      <br/>
      <FeaturedTalents />

      <BenefitSection
        title={t.home.benefitSection.brand.title}
        subtitle={t.home.benefitSection.brand.subtitle}
        image="/images/For-Brands-image-min.png"
        label={t.home.benefitSection.brand.label} 
        background="#E5F1FF"
        item1={t.home.benefitSection.brand.bullet1}
        item2={t.home.benefitSection.brand.bullet2}
        item3={t.home.benefitSection.brand.bullet3}
        color="#009ee3"
        learnMoreLink={language === 'es' ? "/es/brands" : language === 'de' ? "/de/brands" : "/brands"}
      />

      <BenefitSection
        title={t.home.benefitSection.athlete.title}
        subtitle={t.home.benefitSection.athlete.subtitle}
        image="/images/talentBenefitPic-min.png"
        label={t.home.benefitSection.athlete.label}
        background="#E5F1FF"
        item1={t.home.benefitSection.athlete.bullet1}
        item2={t.home.benefitSection.athlete.bullet2}
        item3={t.home.benefitSection.athlete.bullet3}
        color="#009ee3"
        learnMoreLink={language === 'es' ? "/es/talent" : language === 'de' ? "/de/talent" : "/talent"}
      />

      <BenefitSection
        title={t.home.benefitSection.agency.title}
        subtitle={t.home.benefitSection.agency.subtitle}
        image="/images/agency_dashboard-min.png"
        label={t.home.benefitSection.agency.label}
        background="#E5F1FF"
        item1={t.home.benefitSection.agency.bullet1}
        item2={t.home.benefitSection.agency.bullet2}
        item3={t.home.benefitSection.agency.bullet3}
        color="#009ee3"
        learnMoreLink={language === 'es' ? "/es/agency" : language === 'de' ? "/de/agency" : "/agency"}
      />
    </>
  );
}