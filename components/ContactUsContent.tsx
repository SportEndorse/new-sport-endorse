"use client";

import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import "../styles/contactUs.css";

import { useEffect } from 'react';

// Declare HubSpot global for TypeScript
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export default function ContactUsContent() {
  const { language } = useLanguage();
  const t = translations[language].components.contactUs;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/4025606.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/4025606.js';
      script.type = 'text/javascript';
      script.async = true;
      
      script.onload = () => {
        // Wait a bit for the form to load, then check if it worked
        timeoutId = setTimeout(() => {
          const formContainer = document.querySelector('#hubspot-form-container');
          const loadingEl = document.getElementById('form-loading');
          
          // Check if the embedded form loaded
          if (formContainer && formContainer.children.length === 0) {
            console.log('Embedded form failed, trying programmatic approach...');
            
            // Try programmatic form creation
            if (window.hbspt && window.hbspt.forms) {
              window.hbspt.forms.create({
                region: "na1",
                portalId: "4025606",
                formId: "dffd74b7-26ac-40df-86f9-d0365a0778d5",
                target: "#hubspot-form-container"
              });
              
              if (loadingEl) {
                loadingEl.style.display = 'none';
              }
            } else {
              // Show error if both methods fail
              const errorEl = document.getElementById('form-error');
              if (errorEl) {
                errorEl.style.display = 'block';
              }
              if (loadingEl) {
                loadingEl.style.display = 'none';
              }
            }
          } else {
            // Embedded form worked
            if (loadingEl) {
              loadingEl.style.display = 'none';
            }
          }
        }, 3000);
      };
      
      script.onerror = (error) => {
        console.error('Failed to load HubSpot forms script:', error);
        const loadingEl = document.getElementById('form-loading');
        const errorEl = document.getElementById('form-error');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'block';
      };
      
      document.head.appendChild(script);
    } else {
      // Script already exists, just hide loading after a delay
      timeoutId = setTimeout(() => {
        const loadingEl = document.getElementById('form-loading');
        if (loadingEl) {
          loadingEl.style.display = 'none';
        }
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <div className="contact-us-left">
          <h1 className="contact-us-title">{t.title}</h1>
          <p className="contact-us-description">
            {t.description}
          </p>

          <div className="contact-us-info">
            <div className="contact-us-info-section">
              <h3>{t.contactInfo.telephone}</h3>
              <p>+353 1 546 1103</p>
            </div>

            <div className="contact-us-info-section">
              <h3>{t.contactInfo.email}</h3>
              <p>hello@sportendorse.com</p>
            </div>

            <div className="contact-us-info-section">
              <h3>{t.contactInfo.address}</h3>
              <p>
                10 Fitzwilliam Street Upper,<br />
                Dublin 2, D02 T024, Ireland
              </p>
            </div>
          </div>

          <div className="contact-us-socials">
            <h3>{t.followUs}</h3>
            <div className="contact-us-social-logos">
              <span><a target="_blank" href="https://www.facebook.com/SportEndorseLtd/"><img src="/images/facebookLogo.jpg" alt="facebook logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
              <span><a target="_blank" href="https://www.instagram.com/sport_endorse/"><img src="/images/instagramLogo.webp" alt="instagram logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
              <span><a target="_blank" href="https://www.linkedin.com/company/sportendorse/"><img src="/images/linkedinLogo.webp" alt="linkedin logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
              <span><a target="_blank" href="https://www.tiktok.com/@sportendorse"><img src="/images/tiktokLogo.webp" alt="tiktok logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
              <span><a target="_blank" href="https://open.spotify.com/show/2c2mWOkxmUpeGyFI2dZgC5"><img src="/images/spotify.png" alt="spotify logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
              <span><a target="_blank" href="https://www.youtube.com/channel/UCwHt-_eNBHav6TSihoirZIA"><img src="/images/youtube icon.png" alt="youtube logo" width={32} height={32} className="contact-us-social-logo" /></a></span>
            </div>
          </div>
        </div>

        <div className="contact-us-right">
          <div className="hubspot-form-wrapper">
            <div 
              id="hubspot-form-container"
              className="hs-form-frame" 
              data-region="na1" 
              data-form-id="dffd74b7-26ac-40df-86f9-d0365a0778d5" 
              data-portal-id="4025606"
            ></div>
            <div id="form-loading" style={{display: 'block', textAlign: 'center', padding: '2rem'}}>
              Loading form...
            </div>
            <div id="form-error" style={{display: 'none', textAlign: 'center', padding: '2rem', color: '#dc2626'}}>
              Form failed to load. Please contact us directly at <a href="mailto:hello@sportendorse.com">hello@sportendorse.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}