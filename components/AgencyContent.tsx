"use client";

import Community from "@/components/Community";
import "../styles/agency.css";
import BrandsGrid from "@/components/BrandsGrid";
import AgencyHowItWorks from "@/components/AgencyHowItWorks";
import SuccessStories from "@/components/SuccessStories";
import CalendlyDemo from "@/components/CalendlyDemo";
import PartnerAgencies from "@/components/PartnerAgencies";
import CategoryDropdownFAQ from "@/components/CategoryDropdownFAQ";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import { agencyFAQs } from "@/utils/faqData";

export default function AgencyContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const currentAgencyFAQs = agencyFAQs[language] || agencyFAQs.en;

  return (
    <>
      <section className="agency-heroSection">
        <div className="agency-container">
          <div className="agency-content">
            <div className="agency-badge">
              ⦿ {t.agency.badge}
            </div>
            
            <h1 
              className="agency-title"
              dangerouslySetInnerHTML={{ __html: t.agency.title }}
            />
            
            <p className="agency-description">
              {t.agency.description}
            </p>
            <a 
              href="https://calendly.com/d/cwcj-xx7-2xn/sport-endorse-demo-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="agency-cta-button"
            >
              {t.agency.bookCallToPartner}
            </a>
          </div>
          
          <div className="agency-imageContainer">
            <BrandsGrid variant="5x4" label="" />
          </div>
        </div>
      </section>

      <Community showAgencies={true} />

      <AgencyHowItWorks />

      <CalendlyDemo agencies={true} />
      <br/>

      <SuccessStories />

      <PartnerAgencies />

      <CategoryDropdownFAQ 
        title={t.components.faqs.categories.agency}
        faqs={currentAgencyFAQs}
        color="#f59e0b"
      />
    </>
  );
}