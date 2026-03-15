"use client";

import { useState, useEffect } from 'react';
import '../styles/aboutUs.css';
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";


interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  country: string;
  countryFlag: string;
  departments: string[];
  imageUrl?: string;
}

interface TeamGroup {
  type: string;
  members: TeamMember[];
}

export default function AboutUsContent() {
  const { language } = useLanguage();
  const t = translations[language].aboutUs;
  const teamContent = t.team;
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [hubspotLoaded, setHubspotLoaded] = useState(false);

  useEffect(() => {
    // Load HubSpot script when component mounts
    const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/4025606.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/4025606.js';
      script.type = 'text/javascript';
      script.async = true;
      
      script.onload = () => {
        setHubspotLoaded(true);
        // Initialize the form after script loads
        setTimeout(() => {
          if (window.hbspt) {
            try {
              window.hbspt.forms.create({
                region: "na1",
                portalId: "4025606",
                formId: "84e3acc5-80c1-44c9-9870-e179cc5cdfed",
                target: '.hs-form-frame'
              });
            } catch (error) {
              console.log('HubSpot form creation error:', error);
            }
          }
        }, 100);
      };
      
      document.head.appendChild(script);
    } else {
      setHubspotLoaded(true);
    }
  }, []);

  const closeCareerForm = () => {
    setShowCareerForm(false);
  };

  const teamGroups: TeamGroup[] = [
    {
      type: teamContent.groups.boardExecutiveLeadership,
      members: [
        {
          name: "Declan Bourke",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/declan-bourke-headshot.png",
          ...teamContent.members.declanBourke
        },
        {
          name: "Trevor Twamley",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/trevor-twamley-headshot.png",
          ...teamContent.members.trevorTwamley
        }
      ]
    },
    {
      type: teamContent.groups.executiveTeam,
      members: [
        {
          name: "Manav Bhatia",
          countryFlag: "/images/flags/United_Arab_Emirates_flag.png",
          imageUrl: "/images/teamPhotos/manav-bhatia-min.jpg",
          ...teamContent.members.manavBhatia
        },
        {
          name: "Rowan Ellis",
          countryFlag: "/images/flags/UK_flag.png",
          ...teamContent.members.rowanEllis
        },
        {
          name: "Martin Nutty",
          countryFlag: "/images/flags/usa-flag.svg",
          imageUrl: "/images/teamPhotos/martin-nutty-min.jpeg",
          ...teamContent.members.martinNutty
        }
      ]
    },
    {
      type: teamContent.groups.teamMembers,
      members: [
        {
          name: "Seán Armadà",
          countryFlag: "/images/flags/spanish_flag.svg",
          imageUrl: "/images/teamPhotos/sean-armada-headshot.png",
          ...teamContent.members.seanArmada
        },
        {
          name: "Lara-Lyn Connellan",
          countryFlag: "/images/flags/flag-of-south-africa.jpg",
          imageUrl: "/images/teamPhotos/lara-lyn-connellan-headshot.png",
          ...teamContent.members.laraLynConnellan
        },
        {
          name: "Priyanka Deodhar",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/priyanka-deodhar-headshot.png",
          ...teamContent.members.priyankaDeodhar
        },
        {
          name: "Cameron Duckham",
          countryFlag: "/images/flags/flag-of-south-africa.jpg",
          ...teamContent.members.cameronDuckham
        },
        {
          name: "Collin Fiske",
          countryFlag: "/images/flags/usa-flag.svg",
          imageUrl: "/images/teamPhotos/collin-fiske-min.jpg",
          ...teamContent.members.collinFiske
        },
        {
          name: "Liam Forster",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/liam-forster-min.jpeg",
          ...teamContent.members.liamForster
        },
        {
          name: "Clara Gómez",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/clara-gomez-headshot.png",
          ...teamContent.members.claraGomez
        },
        {
          name: "Arthur Groslier",
          countryFlag: "/images/flags/french-flag.svg",
          imageUrl: "/images/teamPhotos/arthur-groslier-headshot.png",
          ...teamContent.members.arthurGroslier
        },
        {
          name: "Allison Melting",
          countryFlag: "/images/flags/usa-flag.svg",
          imageUrl: "/images/teamPhotos/allison-melting-min.jpeg",
          ...teamContent.members.allisonMelting
        },
        {
          name: "Clementine Philbin",
          countryFlag: "/images/flags/UK_flag.png",
          imageUrl: "/images/teamPhotos/clementine-philbin-headshot.png",
          ...teamContent.members.clementinePhilbin
        },
        {
          name: "Paul Richardson",
          countryFlag: "/images/flags/UK_flag.png",
          imageUrl: "/images/teamPhotos/paul-richardson-headshot.png",
          ...teamContent.members.paulRichardson
        },
        {
          name: "Jack Sampson",
          countryFlag: "/images/flags/usa-flag.svg",
          imageUrl: "/images/teamPhotos/jack-sampson-min.jpeg",
          ...teamContent.members.jackSampson
        },
        {
          name: "Lena Smirnova",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/lena-smirnova-headshot.png",
          ...teamContent.members.lenaSmirnova
        },
        {
          name: "Eliott Vauret",
          countryFlag: "/images/flags/Ireland_flag.png",
          imageUrl: "/images/teamPhotos/eliott-vauret-headshot.png",
          ...teamContent.members.eliottVauret
        },
        {
          name: "Nicola Woodgate",
          countryFlag: "/images/flags/flag-of-south-africa.jpg",
          ...teamContent.members.nicolaWoodgate
        }
      ]
    }
  ];

  return (
    <>
      <div className="about-us-container">
        {/* Hero Section */}
        <section className="about-us-hero-section">
          <div className="about-us-hero-overlay"></div>
          <div className="about-us-hero-bg-element-1"></div>
          <div className="about-us-hero-bg-element-2"></div>
          
          <div className="about-us-hero-container">
            <div className="about-us-hero-content">
              <h1 className="about-us-hero-title">
                {t.hero.title}
                <span className="about-us-hero-title-span">{t.hero.titleSpan}</span>
              </h1>
              <p className="about-us-hero-subtitle">
                {t.hero.subtitle}
              </p>
              <div className="about-us-hero-description">
                <p className="about-us-hero-description-text">
                  {t.hero.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="about-us-values-section">
          <div className="about-us-container">
            <div className="about-us-section-header">
              <h2 className="about-us-section-title">
                {t.values.title} <span className="about-us-section-title-span">{t.values.titleSpan}</span>
              </h2>
              <p className="about-us-section-subtitle">
                {t.values.subtitle}
              </p>
            </div>

            <div className="about-us-values-grid">
              {t.values.items.map((value: ValueItem, index: number) => (
                <div key={index} className="about-us-value-card">
                  <div className="about-us-value-card-content">
                    <div className="about-us-value-icon">
                      <span className="about-us-value-icon-text">{value.icon}</span>
                    </div>
                    <h3 className="about-us-value-title">
                      {value.title}
                    </h3>
                  </div>
                  <p className="about-us-value-description">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="about-us-team-section">
          <div className="about-us-container">
            <div className="about-us-section-header">
              <h2 className="about-us-section-title">
                {t.team.title} <span className="about-us-section-title-span">{t.team.titleSpan}</span>
              </h2>
              <p className="about-us-section-subtitle">
                {t.team.subtitle}
              </p>
            </div>

            {teamGroups.map((group) => (
              <div key={group.type} className="about-us-team-group">
                <h3 className="about-us-team-group-title">{group.type}</h3>
                <div className={`about-us-team-grid${group.members.length === 2 ? ' about-us-team-grid-compact' : ''}`}>
                  {group.members.map((member) => (
                    <div key={member.name} className="about-us-team-card">
                      <div className="about-us-team-photo-container">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            width={200}
                            height={200}
                            className="about-us-team-photo"
                            loading="lazy"
                          />
                        ) : (
                          <div className="about-us-team-placeholder-avatar-large" aria-hidden="true">
                            {member.name
                              .split(' ')
                              .map((part) => part[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="about-us-team-info">
                        <h3 className="about-us-team-name">{member.name}</h3>
                        <p className="about-us-team-role">{member.role}</p>
                        <p className="about-us-team-country" style={{ marginTop: "5px" }}>
                          <img
                            src={member.countryFlag}
                            alt={`${member.country} ${teamContent.flagAltSuffix}`}
                            className="about-us-team-country-flag"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />
                          <span>{member.country}</span>
                        </p>
                        <div className="about-us-team-tags">
                          {member.departments.map((department) => (
                            <span key={`${member.name}-${department}`} className="about-us-team-tag">
                              {department}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Careers Section */}
        <section className="about-us-careers-section" id='careers'>
          <div className="about-us-container">
            <div className="about-us-section-header">
              <h2 className="about-us-section-title">
                <span className="about-us-section-title-span">{t.careers.title}</span>{t.careers.titleSpan}
              </h2>
              <p className="about-us-section-subtitle">
                {t.careers.subtitle}
              </p>
            </div>

            <div className="about-us-careers-container">
              <div className="about-us-careers-card">
                <div className="about-us-careers-content">
                  <h3 className="about-us-careers-title">{t.careers.cardTitle}</h3>
                  <p className="about-us-careers-description">
                    {t.careers.cardDescription}
                  </p>
                  <button 
                    className="about-us-careers-button"
                    onClick={() => setShowCareerForm(true)}
                  >
                    {t.careers.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="about-us-partners-section">
          <div className="about-us-container">
            <div className="about-us-section-header">
              <h2 className="about-us-section-title">
                {t.partners.title} <span className="about-us-section-title-span">{t.partners.titleSpan}</span>
              </h2>
              <p className="about-us-section-subtitle">
                {t.partners.subtitle}
              </p>
            </div>

            <div className="about-us-partners-container">
              <div className="about-us-partner-card">
                <div className="about-us-partner-content">
                  <div className="about-us-partner-logo">
                    <a href={t.partners.addVictor.url} target="_blank" rel="noopener">
                      <img 
                        src="/images/add-victor.webp" 
                        alt="add-victor logo" 
                        width={150} 
                        height={150} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }}
                        loading="lazy"/>
                    </a>
                  </div>
                  <div className="about-us-partner-info">
                    <h3 className="about-us-partner-name">
                      {t.partners.addVictor.name}
                    </h3>
                    <p className="about-us-partner-description">
                      {t.partners.addVictor.description}
                    </p>
                    <p className="about-us-partner-description-secondary">
                      {t.partners.addVictor.descriptionSecondary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-us-partner-card">
                <div className="about-us-partner-content">
                  <div className="about-us-partner-logo">
                    <a href={t.partners.threeBigWheels.url} target="_blank" rel="noopener">
                      <img 
                        src="/images/3 big wheels-min.png" 
                        alt="3 big wheels logo" 
                        width={150} 
                        height={150} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }}
                        loading="lazy"/>
                    </a>
                  </div>
                  <div className="about-us-partner-info">
                    <h3 className="about-us-partner-name">
                      {t.partners.threeBigWheels.name}
                    </h3>
                    <p className="about-us-partner-description">
                      {t.partners.threeBigWheels.description}
                    </p>
                    <p className="about-us-partner-description-secondary">
                      {t.partners.threeBigWheels.descriptionSecondary}
                    </p>
                  </div>
                </div>
              </div>

              {/*<div className="about-us-partner-card">
                <div className="about-us-partner-content">
                  <div className="about-us-partner-logo" style={{ backgroundColor:"black"}}>
                    <a href={t.partners.sportingClubIreland.url} target="_blank" rel="noopener">
                      <img 
                        src="/images/The Sporting Club Ireland.webp" 
                        alt="The Sporting Club Ireland logo" 
                        width={150} 
                        height={150} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }}
                        loading="lazy"/>
                    </a>
                  </div>
                  <div className="about-us-partner-info">
                    <h3 className="about-us-partner-name">
                      {t.partners.sportingClubIreland.name}
                    </h3>
                    <p className="about-us-partner-description">
                      {t.partners.sportingClubIreland.description}
                    </p>
                    <p className="about-us-partner-description-secondary">
                      {t.partners.sportingClubIreland.descriptionSecondary}
                    </p>
                  </div>
                </div>
              </div>*/}

              <div className="about-us-partner-card">
                <div className="about-us-partner-content">
                  <div className="about-us-partner-logo">
                    <a href={t.partners.fortyNorth.url} target="_blank" rel="noopener">
                      <img 
                        src="/images/40northlogo.png" 
                        alt="40north logo" 
                        width={150} 
                        height={150} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }}
                        loading="lazy"/>
                    </a>
                  </div>
                  <div className="about-us-partner-info">
                    <h3 className="about-us-partner-name">
                      {t.partners.fortyNorth.name}
                    </h3>
                    <p className="about-us-partner-description">
                      {t.partners.fortyNorth.description}
                    </p>
                    <p className="about-us-partner-description-secondary">
                      {t.partners.fortyNorth.descriptionSecondary}
                    </p>
                  </div>
                </div>
              </div>

              {/*<div className="about-us-partner-card">
                <div className="about-us-partner-content">
                  <div className="about-us-partner-logo">
                    <a href={t.partners.careerFit.url} target="_blank" rel="noopener">
                      <img 
                        src="/images/CareerFit.png" 
                        alt="careerfit logo" 
                        width={150} 
                        height={150} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px' }}
                        loading="lazy"/>
                    </a>
                  </div>
                  <div className="about-us-partner-info">
                    <h3 className="about-us-partner-name">
                      {t.partners.careerFit.name}
                    </h3>
                    <p className="about-us-partner-description">
                      {t.partners.careerFit.description}
                    </p>
                    <p className="about-us-partner-description-secondary">
                      {t.partners.careerFit.descriptionSecondary}
                    </p>
                  </div>
                </div>
              </div>*/}

            </div>
          </div>
        </section>
        
        <br/>
      </div>

      {/* Career Form Popup */}
      {showCareerForm && (
        <div className="popup-overlay" onClick={closeCareerForm}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeCareerForm}>
              x
            </button>
            
            <h3 className="popup-title">{t.careers.formTitle}</h3>
            <p className="popup-subtitle">
              {t.careers.formSubtitle}
            </p>

            <div className="hubspot-form-container">
              {hubspotLoaded ? (
                <div 
                  className="hs-form-frame" 
                  data-region="na1" 
                  data-form-id="84e3acc5-80c1-44c9-9870-e179cc5cdfed" 
                  data-portal-id="4025606"
                ></div>
              ) : (
                <div className="loading-message">{t.careers.formLoading}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}