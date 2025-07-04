import React from 'react';
import { Stamp, Link as LucideLink, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';
// Helper to detect iOS
function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
}
const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Address for maps
  // const address = '5900 Balcones Dr. #23614, Austin, TX, 78731-4257';
  // const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
  // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  // const mapUrl = isIOS() ? appleMapsUrl : googleMapsUrl;
  // Use PO BOX address as the location
  const address = 'PO BOX 2607 Bandera, TX, United States, Texas 78003';
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapUrl = isIOS() ? appleMapsUrl : googleMapsUrl;
  return (
    <footer className="bg-tan text-blue py-8 md:py-10 text-sm leading-normal" style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-x-6 footer-columns-group">
          <div className="space-y-4 md:space-y-5">
            <a 
              onClick={scrollToTop}
              className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
              <img
                src="/THCP_Main_Logo.png"
                alt="THCP Main Logo"
                width={104}
                height={32}
                style={{ marginBottom: '7px' }}
                draggable={false}
              />
            </a>
            <p className="text-blue leading-snug">
              Reliable, professional, and affordable plumbing solutions for your home and business.
            </p>
            <div className="flex gap-2 md:gap-4 footer-social justify-start" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <a href="https://www.instagram.com/txhcpllc/" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[var(--color-brand-accent)] md:hover:text-[var(--color-brand-accent)]/80 transition-all duration-300 md:transform md:hover:-translate-y-1">
                <img src="/Instagram_Logo.png" alt="Instagram Logo" className="h-[21px] w-[21px] object-contain" style={{ display: 'block' }} />
              </a>
              <a href="https://www.facebook.com/txhcpllc" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[var(--color-brand-accent)] md:hover:text-[var(--color-brand-accent)]/80 transition-all duration-300 md:transform md:hover:-translate-y-1">
                <img src="/Facebook_logo.png" alt="Facebook Logo" className="h-[21px] w-[21px] object-contain" style={{ display: 'block' }} />
              </a>
              <a href="https://open.spotify.com/user/zikjs7op32conxgwdggqw5u4b?si=e12bf6253aaa4ade" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[var(--color-brand-accent)] md:hover:text-[var(--color-brand-accent)]/80 transition-all duration-300 md:transform md:hover:-translate-y-1">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[21px] w-[21px] fill-current"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 16.223c-.26.398-1.03.523-1.428.263-2.914-1.78-6.574-2.186-10.95-.992-.49.13-1.006-.166-.13-.49C.88 14.004 1.176 13.5 1.666 13.37c4.875-1.32 8.974-.86 12.273 1.15.39.24.524 1.01.26 1.428.024.008.024.008 0 0zm1.31-2.924c-.326.49-.873.65-1.363.325-3.32-2.02-7.85-2.6-11.52-1.42-.58.18-1.16-.22-1.34-.8-.18-.58.22-1.16.8-1.34 4.22-1.32 9.25-.66 12.99 1.58.49.33.65.87.33 1.36-.004.003-.004.003 0 0zm.024-3.11c-.39.58-1.16.77-1.74.38-3.7-2.31-9.67-3.03-13.43-1.66C.25 8.9.19 8.13.77 7.74c.58-.39 1.35-.19 1.66.39 4.34 1.54 10.87 2.31 15.06.58.58-.24 1.35.02 1.59.59.24.58-.02 1.35-.59 1.59v-.01z"/></svg>
              </a>
            </div>
          </div>
          <div className="hidden md:block mobile-hide-quicklinks space-y-4 md:space-y-0">
            <h3 className="text-base font-semibold text-blue mb-3 leading-snug md:leading-normal">Quick Links</h3>
            <ul className="space-y-0.5 md:space-y-1">
              <li><a href="#gallery" className="text-blue hover:text-blue transition-all duration-300 text-base min-h-[44px] inline-flex items-center leading-snug md:leading-normal">Gallery</a></li>
              <li><a href="#faq" className="text-blue hover:text-blue transition-all duration-300 text-base min-h-[44px] inline-flex items-center leading-snug md:leading-normal">FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-4 md:space-y-0">
            <h3 className="text-base font-semibold text-blue mb-1 md:mb-3 leading-snug md:leading-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Contact Us</h3>
            <ul className="space-y-px md:space-y-1">
              <li className="flex items-start min-h-[44px] leading-snug md:leading-normal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--color-brand-accent)] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue text-base md:text-lg hover:text-blue transition min-h-[44px] inline-flex items-center leading-snug md:leading-normal"
                >
                  PO BOX 2607 Bandera, TX, United States, Texas 78003
                </a>
              </li>
              <li className="flex items-center min-h-[44px] leading-snug md:leading-normal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--color-brand-accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:830-444-5195"
                  className="text-blue text-base md:text-lg hover:text-blue transition min-h-[44px] inline-flex items-center leading-snug md:leading-normal"
                >
                  830-444-5195
                </a>
              </li>
              <li className="flex items-center min-h-[44px] leading-snug md:leading-normal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--color-brand-accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:info@thcp.com"
                  className="text-blue text-base hover:text-blue transition min-h-[44px] inline-flex items-center leading-snug md:leading-normal"
                >
                  info@thcp.com
                </a>
              </li>
              <li className="flex items-center min-h-[44px] leading-snug md:leading-normal">
                <Stamp className="h-5 w-5 mr-3 text-[var(--color-brand-accent)] flex-shrink-0" />
                <span className="text-blue text-base leading-snug md:leading-normal">Mon-Fri: 9am-5pm CST</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-border mt-4 md:mt-10 pt-2 pb-1 md:py-4">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center">
            <p className="text-blue text-xs mb-1 md:mb-0">
              © {new Date().getFullYear()} Your Company LLC. All rights reserved.
            </p>
            <div className="flex flex-col space-y-0.5 md:space-y-0 md:flex-row md:space-x-6 items-center text-center w-full md:w-auto">
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .filter-logo-navbar {
          display: none;
        }
        .footer-social svg, .footer-social .lucide {
          width: 1rem !important;
          height: 1rem !important;
        }
        @media (min-width: 768px) {
          .footer-social svg, .footer-social .lucide {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
        }
        .footer-columns-group {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 1rem !important;
          text-align: left;
        }
        @media (min-width: 768px) {
          .footer-columns-group {
            gap: 1.75rem !important;
            grid-template-columns: minmax(180px, 240px) auto auto !important;
            justify-content: flex-start !important;
          }
        }
        .footer-columns-group > div {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-columns-group > div:first-child {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-columns-group > div:first-child p {
          white-space: normal !important;
          word-break: break-word;
          width: 100% !important;
          min-width: 0 !important;
          display: block !important;
        }
        .footer-columns-group h3,
        .footer-columns-group ul,
        .footer-columns-group p,
        .footer-columns-group span,
        .footer-columns-group a {
          text-align: left !important;
        }
        .mobile-hide-quicklinks {
          display: none !important;
        }
        @media (min-width: 768px) {
          .mobile-hide-quicklinks {
            display: block !important;
          }
        }
        .footer-columns-group h3 {
          font-size: 1rem !important;
          margin-bottom: 0.75rem !important;
        }
        @media (max-width: 767px) {
          .footer-columns-group h3 {
            font-size: 0.9375rem !important;
            margin-bottom: 0.5rem !important;
          }
        }
        .footer-columns-group ul li a,
        .footer-columns-group p,
        .footer-columns-group span {
          font-size: 0.875rem !important;
        }
        @media (max-width: 767px) {
          .footer-columns-group ul li a,
          .footer-columns-group p,
          .footer-columns-group span {
            font-size: 0.8125rem !important;
          }
        }
        .footer-columns-group ul li {
          margin-bottom: 0.25rem !important;
        }
        .footer-columns-group > div {
          padding-bottom: 0.5rem !important;
        }
        @media (min-width: 768px) {
          .footer-columns-group > div {
            padding-bottom: 0 !important;
          }
        }
        footer {
          padding-top: 1.5rem !important;
          padding-bottom: 1.5rem !important;
        }
        @media (min-width: 768px) {
          footer {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }
        }
        .footer-copyright {
          font-size: 0.75rem !important;
        }
        @media (max-width: 767px) {
          footer {
            padding-bottom: 2.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
export default FooterSection;
