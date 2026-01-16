"use client";
import Link from "next/link";

import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import "../styles/footer.css";

export default function UKFooter() {
  const { language } = useLanguage();
  const t = translations[language].footer;
  
  

  useEffect(() => {
    // Load HubSpot script
    if (!document.querySelector('script[src="https://js.hsforms.net/forms/embed/4025606.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/4025606.js';
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const getNavLink = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    
    if (language === 'en') {
      return cleanPath;
    }
    return `/${language}${cleanPath}`;
  };

  return (
    <footer className={`modern-footer ${language === 'es' ? 'footer-spanish' : ''}`}>
      <div className="maxWidth">
        <Link href={language === 'en' ? '/' : `/${language}`} style={{ display: 'block', textAlign: 'center' }}>
          <img src="/images/sport endorse logo white-min.png" alt="Sport Endorse Logo" width={200} height={96} style={{ height: '6rem', width: 'auto', marginBottom: '0' }} />
        </Link>
        
        <div style={{ marginTop: '0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <p>{t.copyright}</p>
          </div>
          
          <div style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <a target="_blank" href={getNavLink("/privacy-center")} style={{display:"inline", textDecoration:"underline", color: 'white', marginRight: '1rem'}}>{t.privacyCentre}</a>
            <a target="_blank" href={getNavLink("/terms-and-conditions")} style={{display:"inline", textDecoration:"underline", color: 'white'}}>{t.termsConditions}</a>
          </div>

          <div className="logoContainer" style={{ margin: '0 auto' }}>
            <p>{t.supportedBy}</p>
            <div className="logo" style={{width:"100px"}}><img src="/images/image-129-min.png" alt="Support Logos" width={100} height={60} /></div>
            <div className="logo"><img src="/images/image-128-min.png" alt="Support Logos" width={90} height={60} /></div>
            <div className="logo" style={{width:"95px"}}><img src="/images/image-127-min.png" alt="Support Logos" width={95} height={60} /></div>
            <div className="logo" style={{width:"135px"}}><img src="/images/image-126-min.png" alt="Support Logos" width={135} height={60} /></div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}