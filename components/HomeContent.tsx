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

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Optimized video source selection with compressed formats
  const getVideoSource = () => {
    if (!isClient) return {
      webm: "/videos/4_3 aspect ratio (wide) .webm",
      mp4: "/videos/4_3 aspect ratio (wide) .MOV"
    };
    
    if (window.innerWidth <= 480) {
      return {
        webm: "/videos/9_16 aspect ratio (mobile_reel_tiktok).webm",
        mp4: "/videos/9_16 aspect ratio (mobile_reel_tiktok).MOV"
      };
    } else if (window.innerWidth <= 768) {
      return {
        webm: "/videos/3_4 aspect ratio (in between).webm", 
        mp4: "/videos/3_4 aspect ratio (in between).MOV"
      };
    } else {
      return {
        webm: "/videos/4_3 aspect ratio (wide) .webm",
        mp4: "/videos/4_3 aspect ratio (wide) .MOV"
      };
    }
  };

  const videoSources = getVideoSource();

  return (
    <>
      <section className="home-heroSection">
        <div className="home-videoBackground">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="home-backgroundVideo"
            preload="auto"
          >
            {/* WebM format for better compression */}
            <source src={videoSources.webm} type="video/webm" />
            {/* Fallback MP4 */}
            <source src={videoSources.mp4} type="video/mp4" />
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
        <AppStores />
      </div>

      <BrandsGrid variant={isMobile ? "5x4" : "8x4"} label={t.home.tableHeader} />

      <br/>
      <FeaturedTalents />

      <BenefitSection
        title={t.home.benefitSection.brand.title}
        subtitle={t.home.benefitSection.brand.subtitle}
        image="/images/For-Brands-image.png"
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
        image="/images/talentBenefitPic.png"
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
        image="/images/agency_dashboard.png"
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