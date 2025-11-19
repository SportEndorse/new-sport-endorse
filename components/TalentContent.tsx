"use client";

import "../styles/talent.css";
import AppStores from "@/components/AppStores";
import SuccessStories from "@/components/SuccessStories";
import BrandsGrid from "@/components/BrandsGrid";
import TalentHowItWorks from "@/components/TalentHowItWorks";
import WhyAthletesChooseUs from "@/components/WhyAthletesChooseUs";
import TalentReviews from "@/components/TalentReviews";
import TrustedSportAgencyPartners from "@/components/TrustedSportAgencyPartners";
import CategoryDropdownFAQ from "@/components/CategoryDropdownFAQ";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import { talentFAQs } from "@/utils/faqData";

export default function TalentContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const currentTalentFAQs = talentFAQs[language] || talentFAQs.en;

  return (
    <>
      <section className="talent-heroSection">
        <div className="talent-container">
          <div className="talent-content">
            <span className="talent-badge">
              ⦿ {t.talent.badge}
            </span>
            
            <h1 
              className="talent-title"
              dangerouslySetInnerHTML={{ __html: t.talent.title }}
            />
            
            <p className="talent-description">
              {t.talent.description}
            </p>
            
            <div className="talent-apps">
              <AppStores pageName="talent" />
            </div>
          </div>
             
          <div className="talent-imageContainer">
            <BrandsGrid variant="5x4" label="" />
          </div>
        </div>
      </section>

      <section className="talent-sponsorship-section">
        <div className="talent-sponsorship-container">
          <h2>{t.talent.sponsorshipSection.title}</h2>
          <p className="talent-sponsorship-lead">
            {t.talent.sponsorshipSection.lead}
          </p>
          <p className="talent-sponsorship-description">
            {t.talent.sponsorshipSection.description}
          </p>
          <p className="talent-sponsorship-benefits">
            {t.talent.sponsorshipSection.benefits}
          </p>
        </div>
      </section>

      <TalentHowItWorks />

      <WhyAthletesChooseUs />

      <SuccessStories />

      <TalentReviews />

      <TrustedSportAgencyPartners />

      <CategoryDropdownFAQ 
        title={t.components.faqs.categories.talent}
        faqs={currentTalentFAQs}
        color="#10b981"
      />

      <br/>
      <br/>
    </>
  );
}