"use client";

import { useEffect } from "react";
import BrandHowItWorks from "@/components/BrandHowItWorks";

// Extend Window interface for HubSpot
declare global {
  interface Window {
    HubSpotConversations?: {
      widget: {
        remove: () => void;
        load: () => void;
      };
    };
    hsConversationsOnReady?: Array<() => void>;
  }
}
import UKBusinessSubscription from "@/components/UKBusinessSubscription";
import BrandReviews from "@/components/BrandReviews";
import LPBrandKeyFeatures from "@/components/LPBrandKeyFeatures";
import LPBrandsGrid from "@/components/LPBrandsGrid";
import { useLanguage } from "@/context/LanguageContext";
import { getTopFeaturedTalents } from "@/utils/featuredTalentsData";

import "../styles/brands.css";
import Community from "./Community";
import UKFooter from "./UKFooter";

type BrandHowItWorksProps = { ctaUrl?: string };
const BrandHowItWorksTyped = BrandHowItWorks as unknown as ComponentType<BrandHowItWorksProps>;


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
  const topTalents = getTopFeaturedTalents(language as 'en' | 'es' | 'de' | 'fr');

  // Remove HubSpot chatbot widget from this landing page
  useEffect(() => {
    const hideHubSpotWidget = () => {
      // Use HubSpot's official API to hide the widget
      if (window.HubSpotConversations?.widget) {
        window.HubSpotConversations.widget.remove();
      }
    };

    // Check if HubSpot is already loaded
    if (window.HubSpotConversations) {
      hideHubSpotWidget();
    } else {
      // Wait for HubSpot to load
      window.hsConversationsOnReady = [
        () => {
          hideHubSpotWidget();
        },
      ];
    }

    // Cleanup: show widget again when leaving this page
    return () => {
      if (window.HubSpotConversations?.widget) {
        window.HubSpotConversations.widget.load();
      }
    };
  }, []);

    return (
        <>
            <div style={{
                backgroundColor:"white", 
                width:"100%", 
                margin:"0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.75rem",
                minHeight: "50px"
            }}>
                <img 
                    src="/images/lp/Airbrush-IMAGE-ENHANCER-1768941753487-1768941753487.png" 
                    alt="Sport Endorse Logo" 
                    style={{
                        display: "block", 
                        maxWidth: "60px", 
                        width: "100%", 
                        height: "auto"
                    }}
                />
            </div>

            <div style={{ 
                position: "relative",
                margin: "0 auto",
                padding: "0",
                maxWidth: "1400px"
            }}>
                <img 
                    src="/images/lp/SE-Landingpage_HeroImage.jpg" 
                    alt="Hero Image" 
                    style={{ 
                        width: "100%", 
                        height: "auto",
                        objectFit: "cover",
                        display: "block",
                        minHeight: "180px"
                        
                    }} 
                />
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    width: "100%",
                    padding: "1rem"
                }}>
                    <title>The Ultimate Sports<br/>Sponsorship Platform</title>
                    <h1 style={{ 
                        fontSize: "clamp(1.25rem, 4vw, 2.75rem)", 
                        fontWeight: "800", 
                        color: "white",
                        marginBottom: "clamp(0.75rem, 2vw, 1rem)",
                        lineHeight: "1.2",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                        fontFamily: "inherit"
                    }}>
                        The Ultimate Sports<br/>Sponsorship Platform
                    </h1>
                    <p style={{ 
                        fontSize: "clamp(0.85rem, 2vw, 1.15rem)", 
                        color: "white",
                        marginBottom: "clamp(1rem, 3vw, 1.5rem)",
                        maxWidth: "min(800px, 90%)",
                        margin: "0 auto",
                        textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
                        fontFamily: "inherit",
                        lineHeight: "1.5"
                    }}>
                        Connecting Brands, Athletes, and Sports Influencers for impactful partnerships
                    </p>
                    <a
                        href="https://platform.sportendorse.com/signup/brand?subscription=trial"
                        className="brands-cta-button"
                        style={{ display: "inline-block", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
                    >
                        Start Free Trial
                    </a>
                </div>
            </div>



            <section className="brands-heroSection">
            <div className="brands-container">
            <div className="brands-content">
                
                <h2 className="brands-title" style={{fontSize: "clamp(1.25rem, 4vw, 2.75rem)", fontFamily: "inherit"}} dangerouslySetInnerHTML={{ __html: title }}></h2>
                
                <p className="brands-description" style={{fontFamily: "inherit"}}>
                {description}
                </p>
                <a 
                href="https://platform.sportendorse.com/signup/brand?subscription=trial"
                className="brands-cta-button"
                >
                {buttonTitle}
                </a>
            </div>
            
            <div className="brands-imageContainer">
                <div className="brands-talent-showcase">
                <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#333', marginBottom: '1rem', margin: '0 0 1rem 0', fontFamily: 'inherit' }}>
                    {featuredAthletes}
                </h2>
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
                        <p style={{ fontSize: '0.85rem', fontWeight: '600', margin: '0 0 0.5rem 0', fontFamily: 'inherit' }}>{talent.name}</p>
                        <p style={{ fontSize: '0.75rem', color: '#666', margin: '0', fontFamily: 'inherit' }}>{talent.sport}</p>
                        </div>
                    </div>
                    ))}
                    <a href="https://platform.sportendorse.com/signup/brand?subscription=trial" className="brands-cta-card" style={{ 
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
                    transition: 'background 0.2s ease',
                    minHeight: '100%'
                    }}>
                    <img src="/images/SE_logo_lockup_wht-min.png" alt="Sport Endorse logo" width={120} height={100} style={{ maxWidth: '80px', width: '100%', height: 'auto', marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.85rem', fontWeight: '600', margin: '0', textTransform: 'uppercase', fontFamily: 'inherit' }}>
                        {viewAll}
                    </p>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>

        <Community />

        <LPBrandKeyFeatures />

        <BrandHowItWorks ctaUrl="https://platform.sportendorse.com/signup/brand?subscription=trial" />

        <LPBrandsGrid variant={"8x4"} label="Brands That Trust Our Sports Marketing Platform" />

        <div style={{ textAlign: "center", margin: "3rem auto", padding: "0 1rem" }}>
          <a
            href="https://platform.sportendorse.com/signup/brand?subscription=trial"
            className="brands-cta-button"
            style={{ display: "inline-block", maxWidth: "100%" }}
          >
            Join Now
          </a>
        </div>

        <UKBusinessSubscription />

        <BrandReviews />

        <UKFooter />

        </>
    );
}