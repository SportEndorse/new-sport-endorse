import Script from 'next/script'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Center | Sport Endorse",
  description: "Manage your privacy preferences and data settings with Sport Endorse. Control how your information is collected and used on our athlete sponsorship platform.",
  alternates: {
    canonical: "https://www.sportendorse.com/privacy-center"
  },
  openGraph: {
    title: "Privacy Center | Sport Endorse",
    description: "Manage your privacy preferences and data settings with Sport Endorse. Control how your information is collected and used on our athlete sponsorship platform.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/privacy-center",
    siteName: "Sport Endorse",
    images: [
      {
        url: "https://www.sportendorse.com/images/sportEndorseLogo-min.png",
        width: 1200,
        height: 630,
        alt: "Sport Endorse logo",
      },
    ],
  },
};

export default function PrivacyCenter() {
  return (
    <>
      {/* Head Script */}
      <Script id="dataships-pc-head" strategy="afterInteractive">
        {`
          (function(w, d){ 
            var s=d.createElement('script'), f=d.getElementsByTagName('script')[0]; 
            s.async=true;
            s.defer=true; 
            s.src="https://api.dataships.io/js/pc.js?apikey=YDf7ngeS_q4cFkPgNcinQ_IqQ2rJBKT1&v=" + Date.now(); 
            s.id = 'dataships-pc-head'; 
            f.parentNode.insertBefore(s,f); 
          })(window, document);
        `}
      </Script>

      <br/>
      <br/>
      <br/>
      <br/>

      {/* Privacy Center iFrame */}
      <iframe 
        data-cookieconsent="ignore"
        style={{
          position: 'fixed',
          border: 'none',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src="https://app.dataships.io/privacycenter/YDf7ngeS_q4cFkPgNcinQ_IqQ2rJBKT1"
        title="Privacy Center"
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </>
  )
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;