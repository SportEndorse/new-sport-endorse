"use client";
import "../styles/featuredTalents.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { getAllFeaturedTalents } from "../utils/featuredTalentsData";

import Link from 'next/link';

export default function FeaturedTalents() {
  const { language } = useLanguage();
  const t = translations[language].components.featuredTalents;
  const talents = getAllFeaturedTalents(language as 'en' | 'es' | 'de');

  const getSubscriptionLink = () => {
    if (language === 'en') {
      return '/subscription';
    } else {
      return `/${language}/subscription`;
    }
  };

  return (
    <section className="featured-talents">
      <div className="header">
        <div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
      </div>
      
      <div className="scrollTalents">
        {talents.map((talent, i) => (
          <div className="talent-card" key={i}>
            <img 
              src={talent.image} 
              alt={`${talent.name} profile`} 
              width={200} 
              height={200}
              loading="lazy"
            />
            <div className="talent-info">
              <p className="talent-name">{talent.name}</p>
              <div className="all-social-logos">
                {talent.followingInstagram && (
                  <div className="social-platform">
                    <img src="/images/instagramLogo.webp" 
                      alt="instagram logo" 
                      width={24} 
                      height={24} 
                      className="social-logo"
                      loading="lazy"/>
                    <p className="follower-count">{talent.followingInstagram}</p>
                  </div>
                )}
                {talent.followingTiktok && (
                  <div className="social-platform">
                    <img src="/images/tiktokLogo.webp" 
                      alt="tiktok logo" 
                      width={24} 
                      height={24} 
                      className="social-logo"
                      loading="lazy"/>
                    <p className="follower-count">{talent.followingTiktok}</p>
                  </div>
                )}
              </div>
              <div className="tags">
                <span><img src="/images/trophy.png" 
                  alt="trophy icon" 
                  width={16} 
                  height={16} 
                  className="tag-icon"
                  loading="lazy"/>{talent.sport}</span>
                <span><img src="/images/location.png" 
                  alt="location icon" 
                  width={16} 
                  height={16} 
                  className="tag-icon"
                  loading="lazy"/>{talent.location}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* CTA Card */}
        <Link href={getSubscriptionLink()} className="cta-card">
          <img src="/images/SE_logo_lockup_wht.png" 
            alt="Sport Endorse logo" 
            width={120} 
            height={160}
            style={{ objectFit: 'contain' }}
            loading="lazy"/>
          <h3>{t.viewAll}</h3>
        </Link>
      </div>
    </section>
  );
}