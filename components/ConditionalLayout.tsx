"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import '../styles/conditionalLayout.css';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where we don't want Header and Footer
  const hideHeaderFooterRoutes = ['/privacy-center', '/lp/get-started'];
  
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (shouldHideHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="conditional-layout-main">{children}</main>
      <Footer />
    </>
  );
}