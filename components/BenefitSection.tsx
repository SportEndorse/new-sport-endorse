"use client";
import "../styles/benefitSection.css";
import AppStores from "./AppStores";

import Link from 'next/link';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

interface BenefitProps {
  title: string;
  subtitle: string;
  image: string;
  label?: string;
  background?: string;
  item1?: string;
  item2?: string;
  item3?: string;
  color?: string;
  learnMoreLink?: string;
}

export default function BenefitSection({ title, subtitle, image, label, background = "#e8f2fd", item1="item1", item2="item2", item3="item3", color="#009ee3", learnMoreLink = "/talent" }: BenefitProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const getPageLink = () => {
    // Determine which page to link to based on the image or other identifiers
    if (image === "/images/agency_dashboard-min.png" || label === t.home.benefitSection.agency.label) {
      // Agency section
      if (language === 'en') {
        return '/agency';
      } else {
        return `/${language}/agency`;
      }
    } else {
      // Default to brands page
      if (language === 'en') {
        return '/brands';
      } else {
        return `/${language}/brands`;
      }
    }
  };
  return (
    <section className="benefit-section" style={{ background, paddingBottom:  "2rem !important"}}>
      <div className="benefit-left">
        {label && <a href={learnMoreLink}><span className="benefit-label" style={{ color }}>◉ {label}</span></a>}
        <h2 style={label ? undefined: { marginTop: 0 }}>{title}</h2>
        <p>{subtitle}</p>
        <div className="icons-row">
          <img src="/images/gold-heart-icon2-min.png" alt="heart" width={24} height={24} className="bullet-icon-mobile" />
          <img src="/images/division_icon-min.png" alt="division" width={24} height={24} className="bullet-icon-mobile" />
          <img src="/images/star_icon-min.png" alt="star" width={24} height={24} className="bullet-icon-mobile" />
        </div>
        <ul>
          <li><img src="/images/gold-heart-icon2-min.png" alt="heart" width={16} height={16} className="bullet-icon" /> {item1}</li>
          <li><img src="/images/division_icon-min.png" alt="division" width={16} height={16} className="bullet-icon" /> {item2}</li>
          <li><img src="/images/star_icon-min.png" alt="star" width={16} height={16} className="bullet-icon" /> {item3}</li>
        </ul>
        <div className="button-group">
          {image && (image !== "/images/talentBenefitPic.png" && image !== "images/agencyBenefitPic.jpg") ? (
            <>
              <Link href={getPageLink()}><button className="benefit-button">{t.common.learnMore}</button></Link>
              <a target="_blank" href={
                (image === "/images/agency_dashboard.png" || label === t.home.benefitSection.agency.label) 
                  ? "https://calendly.com/d/cwcj-xx7-2xn/sport-endorse-demo-agency"
                  : "https://calendly.com/d/dzw-nc4-57b/sport-endorse-demo?month=2025-07"
              }>
              <button className="demo-button">{t.common.bookDemo}</button>
              </a>
            </>
          ) : (
            <div><AppStores /></div>
          )}
        </div>
      </div>
      <div className="benefit-right">
        <img src={image} alt="Benefit Example Image" width={400} height={300} className="benefit-right img" />
      </div>
    </section>
  );
}