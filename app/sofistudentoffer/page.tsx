import SoFiStudentOffer from "@/components/SoFiStudentOffer";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "SoFi Checking & Savings - Disclosures | Sport Endorse",
  description: "Read SoFi Checking & Savings disclosures, including APY details, bonus tiers, fee policy, FDIC insurance, ATM access, overdraft coverage, and terms.",
  alternates: {
    canonical: "https://www.sportendorse.com/sofistudentoffer",
  },
  openGraph: {
    title: "SoFi Checking & Savings - Disclosures | Sport Endorse",
    description: "Read SoFi Checking & Savings disclosures, including APY details, bonus tiers, fee policy, FDIC insurance, ATM access, overdraft coverage, and terms.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/sofistudentoffer",
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

export default function SoFiStudentOfferPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <SoFiStudentOffer />
    </main>
  );
}