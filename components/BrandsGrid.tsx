"use client"
import React from "react";

import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import styles from "../styles/brandsGrid.module.css";

interface BrandsGridProps {
  variant?: "8x4" | "5x4";
  label?: string;
}

const brands = [
  // Brands from target list with available logos
  { src: "/images/homePageTable/alpro-min.png", alt: "Alpro logo" },
  { src: "/images/homePageTable/isdin-min.png", alt: "ISDIN logo" },
  { src: "/images/homePageTable/Kelloggs_Logo_Slider.webp", alt: "Kellogg's logo" },
  { src: "/images/homePageTable/lovable-dark-png-min.png", alt: "Lovable logo" },
  { src: "/images/homePageTable/Optimum_Nutrition_Logo-min.png", alt: "Optimum Nutrition logo" },
  { src: "/images/homePageTable/PricewaterhouseCoopers_Logo-min.png", alt: "PWC logo" },
  { src: "/images/homePageTable/puma.webp", alt: "Puma logo" },
  { src: "/images/homePageTable/Pringles-Logo-min.png", alt: "Pringles logo" },
  { src: "/images/homePageTable/whoop_logo.png", alt: "Whoop logo" },
  { src: "/images/homePageTable/shokz-min.png", alt: "Shokz logo" },
  { src: "/images/homePageTable/hard-rock-min.png", alt: "Hard Rock Cafe logo" },
  { src: "/images/homePageTable/skechers.webp", alt: "Skechers logo" },
  { src: "/images/homePageTable/Specsaver.png", alt: "Specsavers logo" },
  { src: "/images/homePageTable/Sports-Direct_Logo_Slider.png", alt: "Sports Direct logo" },
  { src: "/images/homePageTable/affidea-min.jpg", alt: "Affidea logo" },
  { src: "/images/homePageTable/red_bull-min.png", alt: "Red Bull logo" },
  { src: "/images/homePageTable/revive_active-min.png", alt: "Revive Active logo" },
  { src: "/images/homePageTable/mini-min.png", alt: "Mini logo" },
  { src: "/images/homePageTable/skins-logo-min.png", alt: "Skins logo" },
  { src: "/images/homePageTable/solestar-min.gif", alt: "Solestar logo" },
  { src: "/images/homePageTable/uniphar.png", alt: "AYA/Uniphar logo" },
  { src: "/images/homePageTable/movember-min.png", alt: "Movember logo" },
  { src: "/images/homePageTable/GrantThornton.webp", alt: "Grant Thornton logo" },
  { src: "/images/homePageTable/Glanbia-min.png", alt: "Avonmore/Tirlán/Glanbia logo" },
  { src: "/images/homePageTable/uriage.png", alt: "Uriage logo" },
  { src: "/images/homePageTable/sons-hair-loss-uk.png", alt: "Sons logo" },
  { src: "/images/homePageTable/sunvit-d3.png", alt: "SunVit-D3 logo" },
  { src: "/images/homePageTable/dalata-min.png", alt: "Dalata Hotel Group logo" },
  { src: "/images/homePageTable/active-iron-min.png", alt: "Active Iron logo" },
  { src: "/images/homePageTable/BBC-news-min.png", alt: "BBC logo" },
  { src: "/images/homePageTable/popeyes-supplements-min.png", alt: "Popeyes Supplements logo"},
  
  { src: "/images/SE_logo_lockup_wht1-min.png", alt: "sport endorse logo", isButton: true }
];

export default function BrandsGrid({ variant = "8x4", label }: BrandsGridProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const columns = variant === "8x4" ? 8 : 5;
  const rows = 4;
  const gridBrands = brands.slice(0, columns * rows);

  const getSubscriptionLink = () => {
    if (language === 'en') {
      return '/subscription';
    } else {
      return `/${language}/subscription`;
    }
  };

  const handleSubscriptionClick = () => {
    router.push(getSubscriptionLink());
  };

  return (
    <div className={styles.brandsGridWrapper}>
      {label && <h2 className={styles.label}>{label}</h2>}
      <table className={styles.brandsTable}>
        <tbody>
          {[...Array(rows)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {gridBrands.slice(rowIdx * columns, (rowIdx + 1) * columns).map((brand, colIdx) => (
                <td key={colIdx}>
                  {brand.isButton ? (
                    <button
                      className={styles.ctaButton}
                      onClick={handleSubscriptionClick}
                    >
                      <img 
                        src={brand.src} 
                        alt={brand.alt}
                        width={120}
                        height={60}
                        style={{ objectFit: 'contain' }}
                        loading="lazy"/>
                    </button>
                  ) : (
                    <img 
                      src={brand.src} 
                      alt={brand.alt}
                      width={120}
                      height={60}
                      style={{ objectFit: 'contain' }}
                      loading="lazy"/>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 