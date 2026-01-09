"use client";

import BrandHowItWorks from "@/components/BrandHowItWorks";
import BusinessSubscription from "@/components/BusinessSubscription";
import BrandReviews from "@/components/BrandReviews";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import { getTopFeaturedTalents } from "@/utils/featuredTalentsData";

import "../styles/brands.css";
import Community from "./Community";
import BrandsGrid from "./BrandsGrid";
import BrandKeyFeatures from "./BrandKeyFeatures";


interface BrandsContentProps {
  title: string;
  description: string;
  featuredAthletes: string;
  viewAll: string;
  buttonTitle: string;
}

export default function GetStartedContent({ 
  title, 
  description, 
  featuredAthletes, 
  viewAll,
  buttonTitle
}: BrandsContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const topTalents = getTopFeaturedTalents(language as 'en' | 'es' | 'de');


    return (
        <>
            <div style={{ 
                position: "relative",
                margin: "0",
                padding: "0"
            }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center",
                    gap: "0",
                    margin: "0",
                    overflow: "hidden"
                }}>
                    <img 
                        src="/images/lp/Marc Messori 2.jpeg" 
                        alt="Athlete 2" 
                        style={{ 
                            width: "33.333%", 
                            height: "auto",
                            objectFit: "cover",
                            display: "block"
                        }} 
                    />
                    <img 
                        src="/images/lp/IMG_1817.jpeg" 
                        alt="Athlete 1" 
                        style={{ 
                            width: "33.333%", 
                            height: "auto",
                            objectFit: "cover",
                            display: "block"
                        }} 
                    />
                    <img 
                        src="/images/lp/IMG_6539.jpeg" 
                        alt="Athlete 3" 
                        style={{ 
                            width: "33.333%", 
                            height: "auto",
                            objectFit: "cover",
                            display: "block"
                        }} 
                    />
                </div>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    width: "100%",
                    padding: "0 1rem"
                }}>
                    <h1 style={{ 
                        fontSize: "3rem", 
                        fontWeight: "800", 
                        color: "white",
                        marginBottom: "1rem",
                        lineHeight: "1.2",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
                    }}>
                        The Ultimate Sports<br/>Sponsorship Platform
                    </h1>
                    <p style={{ 
                        fontSize: "1.25rem", 
                        color: "white",
                        marginBottom: "2rem",
                        maxWidth: "800px",
                        margin: "0 auto 2rem",
                        textShadow: "2px 2px 6px rgba(0,0,0,0.7)"
                    }}>
                        Connecting Brands, Athletes, and Sports Influencers for impactful partnerships
                    </p>
                    <a
                        href="https://platform.sportendorse.com/signup/brand?subscription=trial"
                        className="brands-cta-button"
                        style={{ display: "inline-block" }}
                    >
                        Start Free Trial
                    </a>
                </div>
            </div>



            <section className="brands-heroSection">
            <div className="brands-container">
            <div className="brands-content">
                
                <h1 className="brands-title" style={{fontSize: "2rem !important"}} dangerouslySetInnerHTML={{ __html: title }}></h1>
                
                <p className="brands-description">
                {description}
                </p>
                <a 
                href={language === 'en' ? '/subscription' : `/${language}/subscription`}
                className="brands-cta-button"
                >
                {buttonTitle}
                </a>
            </div>
            
            <div className="brands-imageContainer">
                <div className="brands-talent-showcase">
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                    {featuredAthletes}
                </p>
                <div className="brands-talent-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '1rem',
                    background: '#f0f8ff',
                    padding: '1.5rem',
                    borderRadius: '1rem'
                }}>
                    {topTalents.map((talent, index) => (
                    <div key={index} className="brands-talent-card" style={{ 
                        background: 'white', 
                        borderRadius: '0.75rem', 
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <img src={talent.image} alt={talent.name} width={200} height={120} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                        <div style={{ padding: '0.75rem' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>{talent.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#666', margin: '0' }}>{talent.sport}</p>
                        </div>
                    </div>
                    ))}
                    <a href={language === 'en' ? '/subscription' : `/${language}/subscription`} className="brands-cta-card" style={{ 
                    background: '#0078c1', 
                    borderRadius: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    textAlign: 'center',
                    padding: '1rem',
                    transition: 'background 0.2s ease'
                    }}>
                    <img src="/images/SE_logo_lockup_wht-min.png" alt="Sport Endorse logo" width={120} height={100} style={{ maxWidth: '80px', marginBottom: '0.0' }} />
                    <p style={{ fontSize: '0.85rem', fontWeight: '600', margin: '0', textTransform: 'uppercase' }}>
                        {viewAll}
                    </p>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>

        <Community />

        <BrandKeyFeatures />

        <div style={{ textAlign: "center", margin: "0rem auto 3rem" }}>
          <a
            href="https://platform.sportendorse.com/signup/brand?subscription=trial"
            className="brands-cta-button"
            style={{ display: "inline-block" }}
          >
            1 Month Free Trial
          </a>
        </div>

        <BrandHowItWorks />

        <BrandsGrid variant={"8x4"} label={t.home.tableHeader} />

        <div style={{ textAlign: "center", margin: "0rem auto 3rem" }}>
          <a
            href="https://platform.sportendorse.com/signup/brand?subscription=trial"
            className="brands-cta-button"
            style={{ display: "inline-block" }}
          >
            Join Now
          </a>
        </div>

        <BusinessSubscription titleLevel="h1" />

        <BrandReviews />

        </>
    );
}