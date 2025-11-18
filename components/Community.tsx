"use client";
import "../styles/community.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";


interface CommunityProps {
  showAgencies?: boolean;
}

export default function Community({ showAgencies = false }: CommunityProps) {
  const { language } = useLanguage();
  const t = translations[language].components.community;
  
  // Hard-coded values
  const athletes = "7000+";
  const brands = "650+";
  const agencies = "20+";
  const sports = "280+";
  const nationalities = "85+";

  return (
    <section className="statistics-section">
      {/*<div className="live-badge">
        <span className="dot"></span> {t.liveBadge}
      </div>*/}
      <div className="statistics-header">
        <p className="statistics-title">{t.title}</p>
        {/*<p style={{width:"50%"}}>
          Unlock actionable insights with our advanced analytics, empowering you to optimize your sports marketing strategies.
        </p>*/}
      </div>
      <div className="statistics-grid">
        <div className="stat-box">
          <div className="stat-content">
            <img src="/images/athlete-min.png" alt="Athletes icon" width={60} height={60} style={{backgroundColor:"#0078c1"}}/>
            <h3>{athletes.toLocaleString()}</h3>
          </div>
          <hr className="stats-bar"/>
          <p>{t.labels.athletes}</p>
        </div>
        <div className="stat-box">
          <div className="stat-content">
            <img src="/images/price-tag-min.png" alt={showAgencies ? "Agencies icon" : "Brands icon"} width={60} height={60} style={{backgroundColor:"#F6B014"}}/>
            <h3>{showAgencies ? agencies : brands}</h3>
          </div>
          <hr className="stats-bar"/>
          <p>{showAgencies ? t.labels.agencies : t.labels.brands}</p>
        </div>
        <div className="stat-box">
          <div className="stat-content">
            <img src="/images/statistics/soccer-ball-min.png" alt="Sports icon" width={60} height={60} style={{backgroundColor:"#83BF24"}}/>
            <h3>{sports.toLocaleString()}</h3>
          </div>
          <hr className="stats-bar"/>
          <p>{t.labels.sports}</p>
        </div>
        <div className="stat-box">
          <div className="stat-content">
            <img src="/images/worldwide-min.png" alt="Nationalities icon" width={60} height={60} style={{backgroundColor:"#FF5151"}}/>
            <h3>{nationalities.toLocaleString()}</h3>
          </div>
          <hr className="stats-bar"/>
          <p>{t.labels.nationalities}</p>
        </div>
      </div>
    </section>
  );
}
