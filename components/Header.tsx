"use client";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import type { Language } from "../context/LanguageContext";
import translations from "../utils/translations";
import "../styles/header.css";
import "../styles/mainLogo.css";

export default function Header() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].header;
  const router = useRouter();
  const pathname = usePathname();
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [signUpDropdownOpen, setSignUpDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        if (hamburgerMenuOpen) {
          setHamburgerMenuOpen(false);
        }
        if (signUpDropdownOpen) {
          setSignUpDropdownOpen(false);
        }
        if (languageDropdownOpen) {
          setLanguageDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hamburgerMenuOpen, signUpDropdownOpen, languageDropdownOpen]);

  // Detect language from URL and update context
  useEffect(() => {
    let detectedLanguage: Language = 'en'; // default
    
    // Only check the first path segment for language
    const pathSegments = pathname.split('/').filter(segment => segment);
    const firstSegment = pathSegments[0];
    
    if (firstSegment === 'es') {
      detectedLanguage = 'es';
    } else if (firstSegment === 'de') {
      detectedLanguage = 'de';
    }
    
    if (detectedLanguage !== language) {
      changeLanguage(detectedLanguage);
    }
  }, [pathname, language, changeLanguage]);

  const getFlagImage = (lang: string) => {
    switch(lang) {
      case 'en': return '/images/flags/UK_flag.png';
      case 'es': return '/images/flags/spanish_flag.svg';
      case 'de': return '/images/flags/german_flag.png';
      default: return '/images/flags/UK_flag.png';
    }
  };

  const getLocalizedPath = (newLanguage: Language, currentPath: string) => {
    // Handle root pages (/, /es, /de) - these should map to language roots, not /home
    if (currentPath === '/' || currentPath === '/es' || currentPath === '/de') {
      if (newLanguage === 'en') {
        return '/';
      } else {
        return `/${newLanguage}`;
      }
    }
    
    // Remove any existing language prefix
    let cleanPath = currentPath;
    
    // Remove language prefixes more carefully
    if (cleanPath.startsWith('/es/')) {
      cleanPath = cleanPath.substring(3);
    } else if (cleanPath.startsWith('/de/')) {
      cleanPath = cleanPath.substring(3);
    }
    
    // Ensure cleanPath starts with / if it's not empty
    if (cleanPath && !cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    
    // Special handling for home page (/home, /es/home, /de/home) - redirect to root
    if (cleanPath === '/home') {
      if (newLanguage === 'en') {
        return '/';
      } else {
        return `/${newLanguage}`;
      }
    }
    
    // Add new language prefix (except for English which is default)
    if (newLanguage === 'en') {
      return cleanPath;
    } else {
      return `/${newLanguage}${cleanPath}`;
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    const newPath = getLocalizedPath(newLanguage, pathname);
    router.push(newPath);
    setLanguageDropdownOpen(false);
  };

  const getNavLink = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    
    if (language === 'en') {
      return cleanPath;
    }
    return `/${language}${cleanPath}`;
  };

  return (
    <header className="modern-header" ref={headerRef}>
      {/* Logo/Home Button - Far left */}
      <div className="logo-area">
        <Link href={language === 'en' ? '/' : `/${language}`}>
          <img src="/images/sportEndorseLogo.png" alt="sport endorse logo" width={40} height={40} />
          <p>SPORT ENDORSE</p>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <Link href={getNavLink("/talent")} style={{textAlign:"center"}}>{t.talent}</Link>
        <Link href={getNavLink("/brands")} style={{textAlign:"center"}}>{t.brand}</Link>
        <Link href={getNavLink("/agency")} style={{textAlign:"center"}}>{t.agencies}</Link>
        <Link href={getNavLink("/subscription")} style={{textAlign:"center"}}>{t.subscription}</Link>
      </nav>

      {/* Actions */}
      <div className="actions">
        {/* Language Dropdown */}
        <div className="custom-language-dropdown">
          <button 
            className="language-selector"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          >
            <img src={getFlagImage(language)} alt={language} width={30} height={20} /> 
            <span className="dropdown-arrow">{languageDropdownOpen ? "▴" : "▾"}</span>
          </button>
          {languageDropdownOpen && (
            <div className="language-dropdown-content">
              <button onClick={() => handleLanguageChange('en')}>
                <img src="/images/flags/UK_flag.png" alt="English" width={30} height={20} />
              </button>
              <button onClick={() => handleLanguageChange('es')}>
                <img src="/images/flags/spanish_flag.svg" alt="Español" width={30} height={20} />
              </button>
              <button onClick={() => handleLanguageChange('de')}>
                <img src="/images/flags/german_flag.png" alt="Deutsch" width={30} height={20} />
              </button>
            </div>
          )}
        </div>

        {/* Sign Up Dropdown */}
        <div 
          className="signup-dropdown"
          onMouseEnter={() => setSignUpDropdownOpen(true)}
          onMouseLeave={() => setSignUpDropdownOpen(false)}
        >
          <button className="signup-btn">
            {t.signUpBtn} {signUpDropdownOpen ? "▴" : "▾"}
          </button>
          <div className="signup-dropdown-content">
            <Link href={getNavLink("/subscription")}>
              {t.signUpBrand}
            </Link>
            <a target="_blank" href="https://platform.sportendorse.com/signup/talent">
              {t.signUpTalent}
            </a>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Button - Far right */}
      <div
        className="hamburger-menu-btn"
        onMouseEnter={() => setHamburgerMenuOpen(true)}
        onMouseLeave={() => setHamburgerMenuOpen(false)}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />

        {/* Hamburger Dropdown Menu */}
        {hamburgerMenuOpen && (
          <div className="hamburger-dropdown">
            <a target="_blank" href="https://platform.sportendorse.com/login" onClick={() => setHamburgerMenuOpen(false)}>
              {t.login}
            </a>
            {isMobile && (
              <>
                <Link href={getNavLink("/talent")} onClick={() => setHamburgerMenuOpen(false)}>
                  {t.talent}
                </Link>
                <Link href={getNavLink("/brands")} onClick={() => setHamburgerMenuOpen(false)}>
                  {t.brand}
                </Link>
                <Link href={getNavLink("/agency")} onClick={() => setHamburgerMenuOpen(false)}>
                  {t.agencies}
                </Link>
                <Link href={getNavLink("/subscription")} onClick={() => setHamburgerMenuOpen(false)}>
                  {t.subscription}
                </Link>
              </>
            )}
            <a target="_blank" href="https://calendly.com/d/dzw-nc4-57b/sport-endorse-demo?month=2025-07" onClick={() => setHamburgerMenuOpen(false)}>
              {t.bookDemo}
            </a>
            <Link href={getNavLink("/success-stories")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.successStories}
            </Link>
            <Link href={getNavLink("/about-us")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.aboutUs}
            </Link>
            <Link href={getNavLink("/blog")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.blog}
            </Link>
            <Link href={getNavLink("/podcasts")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.podcasts}
            </Link>
            <Link href={getNavLink("/faqs")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.faqs}
            </Link>
            <Link href={getNavLink("/contact-us")} onClick={() => setHamburgerMenuOpen(false)}>
              {t.contactUs}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}