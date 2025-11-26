import "../styles/base.css";
import "../styles/header.css";
import "../styles/footer.css";
import { LanguageProvider } from "../context/LanguageContext";
import { WordPressDataProvider } from "../context/WordPressDataContext";
import ConditionalLayout from "../components/ConditionalLayout";
import { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  //metadataBase: new URL("put the home url here later"),
  title: "Sport Endorse: Connecting Elite Athletes & Brand Ambassadors for Sports Sponsorship",
  description: "Sport Endorse is your platform for sports marketing, linking brands with elite athletes and sports influencers for sponsorship management and authentic partnerships.",
  openGraph:{ // og:title and so on
    title: "Sport Endorse: Connecting Elite Athletes & Brand Ambassadors for Sports Sponsorship",
    description: "Sport Endorse is your platform for sports marketing, linking brands with elite athletes and sports influencers for sponsorship management and authentic partnerships.",
    type:"website",
    locale:"en_US",
    //url:"" to be added later
    siteName:"Sport Endorse"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="SportEndorse, Talent, Brands, Subscription, Agencies, Success Stories"></meta>
        <meta name="author" content="SportEndorse"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <link rel="icon" type="image/ico" href="favicon.ico" />
        
        {/* Optimized video preloading with WebM format */}
        <link rel="preload" as="video" href="/videos/4_3 aspect ratio (wide) .webm" type="video/webm" />
        
        {/* DNS prefetch for potential video CDN */}
        <link rel="dns-prefetch" href="//cdn.sportendorse.com" />
        {/* DNS prefetch for Cookiebot */}
        <link rel="dns-prefetch" href="//consent.cookiebot.com" />

        {/* Dataships Cookiebot Consent Banner - Must be first script */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="45651459-eed5-4834-bedb-ffba4870893a"
          data-blockingmode="auto"
          type="text/javascript"
        />

        {/*<!-- Start of HubSpot Embed Code -->*/}
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/4025606.js"
          strategy="afterInteractive"
        />
        {/*<!-- End of HubSpot Embed Code -->*/}

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TK4NZ6T');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body style={{background:"white"}}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TK4NZ6T"
            height="0" 
            width="0" 
            style={{display:"none", visibility:"hidden"}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <noscript>
          <div style={{margin:"70px 20px", backgroundColor:"white"}}>
            <h1>JavaScript Required</h1>
            <p>Sport Endorse requires JavaScript to function properly. Please enable JavaScript in your browser settings and refresh the page.</p>
            <p><strong>To enable JavaScript:</strong></p>
            <ul>
              <li>Chrome/Edge: Settings → Privacy and Security → Site Settings → JavaScript</li>
              <li>Firefox: about:config → javascript.enabled → true</li>
              <li>Safari: Preferences → Security → Enable JavaScript</li>
            </ul>
          </div>
        </noscript>

        <LanguageProvider>
          <WordPressDataProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          </WordPressDataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}