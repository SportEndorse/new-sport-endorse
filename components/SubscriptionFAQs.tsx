"use client";

import CategoryDropdownFAQ from "@/components/CategoryDropdownFAQ";
import { subscriptionFAQs } from "@/utils/faqData";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";

export default function SubscriptionFAQs() {
  const { language } = useLanguage();
  const t = translations[language].components.faqs;
  const currentSubscriptionFAQs = subscriptionFAQs[language] || subscriptionFAQs.en;

  return (
    <CategoryDropdownFAQ
      title={t.categories.subscription}
      faqs={currentSubscriptionFAQs}
      color="#8b5cf6"
    />
  );
}

