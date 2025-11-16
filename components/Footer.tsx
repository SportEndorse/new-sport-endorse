"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import "../styles/footer.css";
import AppStores from "./AppStores";

export default function Footer() {
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
        <Link href={language === 'en' ? '/' : `/${language}`}>
          <Image src="/images/sport endorse logo white.png" alt="Sport Endorse Logo" width={200} height={96} style={{ height: '6rem', width: 'auto', marginBottom: '0' }} />
        </Link>
        <div className="footer-top">
          <div className="newsletter">
            <h4>{t.newsletterTitle}</h4>
            <p>{t.newsletterDescription}</p>
            <div className="hs-form-frame" data-region="na1" data-form-id="055eacf1-693f-4dc9-b3fe-d89bc73e48b2" data-portal-id="4025606"></div>

            <div className="all-social-logos">
              <span><a target="_blank" href="https://www.facebook.com/SportEndorseLtd/"><Image src="/images/facebookLogo.jpg" alt="facebook logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
              <span><a target="_blank" href="https://www.instagram.com/sport_endorse/"><Image src="/images/instagramLogo.webp" alt="instagram logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
              <span><a target="_blank" href="https://www.linkedin.com/company/sportendorse/"><Image src="/images/tiktokLogo.webp" alt="tiktok logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
              <span><a target="_blank" href="https://www.tiktok.com/@sportendorse"><Image src="/images/linkedinLogo.webp" alt="linkedin logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
              <span><a target="_blank" href="https://open.spotify.com/show/2c2mWOkxmUpeGyFI2dZgC5"><Image src="/images/spotify.png" alt="spotify logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
              <span><a target="_blank" href="https://www.youtube.com/channel/UCwHt-_eNBHav6TSihoirZIA"><Image src="/images/youtube icon.png" alt="youtube logo" width={32} height={32} className="social-logo" loading="lazy" sizes="32px" /></a></span>
            </div>
            
          </div>


          <div className="footer-links">
            <div>
              {/*<h5>{/* <span className="footer-number">01]</span> }<Link target="_blank" href="https://platform.sportendorse.com/signup/brand" >{t.links.signUpBrand}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} /></Link></h5>*/}
              {/*<h5>{/* <span className="footer-number">06]</span> <Link target="_blank" href="https://platform.sportendorse.com/signup/talent">{t.links.signUpTalent}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} /></Link></h5>*/}
              <h5>{/* <span className="footer-number">02]</span> */}<Link target="_blank" href="https://calendly.com/d/dzw-nc4-57b/sport-endorse-demo?month=2025-07">{t.links.bookDemo}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>
              <h5>{/* <span className="footer-number">03]</span> */}<Link href={getNavLink("/podcasts")}>{t.links.podcasts}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>
              <h5>{/* <span className="footer-number">04]</span> */}<Link href={getNavLink("/about-us#careers")}>{t.links.careers}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>
              <h5>{/* <span className="footer-number">05]</span> */}<Link href={getNavLink("/about-us")}>{t.links.aboutUs}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>
            </div>
            <div>
              <h5>{/* <span className="footer-number">09]</span> */}<Link href={getNavLink("/blog")}>{t.links.blog}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>     
              <h5>{/* <span className="footer-number">07]</span> */}<Link href={getNavLink("/success-stories")}>{t.links.successStories}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>
              <h5>{/* <span className="footer-number">08]</span> */}<Link href={getNavLink("/faqs")}>{t.links.faqs}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} loading="lazy" sizes="16px" /></Link></h5>      
              <h5>{/* <span className="footer-number">10]</span> */}<Link href={getNavLink("/contact-us")}>{t.links.contactUs}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} /></Link></h5>
              <h5>{/* <span className="footer-number">11]</span> */}<Link href={getNavLink("/news")}>{t.links.news}<Image src="/images/yellowArrow.svg" alt="yellow arrow svg" width={16} height={16} /></Link></h5>
            </div>

            <span className="footer-app-store-logos">
              <AppStores />
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>{t.copyright}</p><br />
            <a target="_blank" href={getNavLink("/privacy-center")} style={{display:"inline", textDecoration:"underline"}}>{t.privacyCentre}</a><br />
            <a target="_blank" href={getNavLink("/terms-and-conditions")} style={{display:"inline", textDecoration:"underline"}}>{t.termsConditions}</a>
          </div>

          <div className="footer-bottom-right">
            <div className="logoContainer">
              <p>{t.supportedBy}</p>
              <div className="logo" style={{width:"100px"}}><Image src="/images/image-129.png" alt="Support Logos" width={100} height={60} /></div>
              <div className="logo"><Image src="/images/image-128.png" alt="Support Logos" width={90} height={60} /></div>
              <div className="logo" style={{width:"95px"}}><Image src="/images/image-127.png" alt="Support Logos" width={95} height={60} /></div>
              <div className="logo" style={{width:"135px"}}><Image src="/images/image-126.png" alt="Support Logos" width={135} height={60} /></div>
            </div>
          </div>

        </div>
        
      </div>
    </footer>
  );
}