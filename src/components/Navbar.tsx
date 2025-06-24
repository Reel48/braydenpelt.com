import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { supabase } from '../supabaseClient';

// Update mobile top bar styles
const mobileTopBarStyle = `
  @media (max-width: 639px) {
    .mobile-top-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 60;
      background: var(--color-blue);
      color: var(--color-white);
      font-size: 0.95rem;
      padding: 0.4rem 0.5rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 2rem;
    }
    .mobile-top-bar-link {
      color: var(--color-white);
      text-decoration: none;
      font-weight: 600;
      margin-left: 0.3em;
      margin-right: 0.1em;
      transition: color 0.2s;
    }
    .mobile-top-bar-link:active,
    .mobile-top-bar-link:focus,
    .mobile-top-bar-link:hover {
      color: var(--color-green);
      text-decoration: underline;
    }
  }
  @media (min-width: 640px) {
    .mobile-top-bar { display: none; }
  }
`;

// Add scrollToTop utility at the top, after imports
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { to: '/#faq', label: 'FAQs', type: 'link' },
    { label: 'SCHEDULE SERVICES', type: 'disabled' },
    { to: 'tel:830-444-5195', label: 'GIVE ME A CALL', type: 'tel' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  return (
    <>
      <style>{mobileTopBarStyle}</style>
      <style>{`
        nav.fixed.w-full.z-50 {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--color-white) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        nav.fixed.w-full.z-50.scrolled {
          background: var(--color-white) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        @media (max-width: 639px) {
          nav.fixed.w-full.z-50 {
            top: calc(env(safe-area-inset-top, 0px) + 2rem);
            background: var(--color-white) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          #mobile-menu {
            background: var(--color-brand-accent) !important;
          }
          #mobile-menu a,
          #mobile-menu button,
          #mobile-menu [disabled],
          #mobile-menu .text-white {
            color: #fff !important;
            fill: #fff !important;
          }
        }
        .nav-link {
          transition: color 0.3s ease-in-out;
          font-weight: 500;
        }
        .nav-link.scrolled {
          color: var(--color-blue);
        }
        .nav-link:hover {
          color: var(--color-blue);
        }
        .navbar-logo-img {
          transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cart-icon-fixed {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 100;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s;
        }
        .cart-icon-fixed:active {
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        }
        .cart-badge {
          position: absolute;
          top: 0.2rem;
          right: 0.2rem;
          background: var(--color-brand-accent);
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          border-radius: 9999px;
          padding: 0.15em 0.5em;
          min-width: 1.2em;
          text-align: center;
          line-height: 1;
          pointer-events: none;
        }
        .mobile-navbar-hamburger {
          min-width: 44px;
          min-height: 44px;
          padding: 0.5rem;
          z-index: 50;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s;
          color: var(--color-brand-custom-order) !important;
        }
        @media (min-width: 768px) {
          /* .mobile-navbar-base-styles { display: none !important; } */
        }
        .no-scroll {
          overflow: hidden !important;
          position: fixed !important;
          width: 100vw !important;
        }
      `}</style>
      {/* Mobile Navbar (md:hidden) */}
      <header
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '70px',
          zIndex: 50,
          background: 'var(--color-white)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
        {/* Left-side placeholder to balance the hamburger button, ensuring the logo is truly centered */}
        <img
          src="/braydenpeltlogo.png"
          alt="Brayden Pelt Logo"
          className="navbar-logo-img"
          style={{ height: '48px', width: 'auto', display: 'block' }}
        />
        {/* Hamburger/Close Icon on right */}
        <button
          className="mobile-navbar-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
          type="button"
        >
          {isOpen ? (
            <X className="block h-6 w-6" />
          ) : (
            <Menu className="block h-6 w-6" />
          )}
        </button>
      </header>
      {/* Mobile menu panel (customized) */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} mobile-menu-all-white`}
        aria-hidden={!isOpen}
        style={{ paddingTop: '70px', zIndex: 40, background: '#292c2f' }}
      >
        <div className="flex flex-col justify-start items-center h-full w-full pt-8 space-y-8 relative" style={{height: '100%'}}>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="text-white text-3xl font-bold py-6 px-8 w-full flex justify-center items-center hover:bg-[var(--color-brand-accent-hover)] hover:text-white focus:bg-[var(--color-brand-accent-hover)] focus:text-white border-none shadow-none"
            style={{ background: 'none', textDecoration: 'none' }}
            onClick={() => setIsOpen(false)}
          >
            <a href="/#faq">FAQs</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-white text-3xl font-bold py-6 px-8 w-full flex justify-center items-center hover:bg-[var(--color-brand-accent-hover)] hover:text-white focus:bg-[var(--color-brand-accent-hover)] focus:text-white border-none shadow-none"
            style={{ background: 'none', textDecoration: 'none', color: '#fff', WebkitTextFillColor: '#fff', opacity: 1 }}
            disabled
          >
            SCHEDULE SERVICES
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="text-white text-3xl font-bold py-6 px-8 w-full flex justify-center items-center hover:bg-[var(--color-brand-accent-hover)] hover:text-white focus:bg-[var(--color-brand-accent-hover)] focus:text-white border-none shadow-none"
            style={{ background: 'none', textDecoration: 'none' }}
            onClick={() => setIsOpen(false)}
          >
            <a href="tel:830-444-5195">GIVE ME A CALL</a>
          </Button>
          {/* Spacer to push the image to the bottom */}
          <div style={{ flex: 1, width: '100%' }}></div>
          {/* Pins image at the very bottom */}
          <img
            src="/THCP_Pins.png"
            alt="THCP Pins"
            style={{ width: '100vw', maxWidth: '100%', objectFit: 'cover', display: 'block' }}
            className="block"
            draggable={false}
          />
        </div>
      </div>
      {/* Desktop Navbar (unchanged, hidden on mobile) */}
      <nav className="fixed w-full z-50 transition-all duration-400 hidden md:block scrolled">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="navbar-logo">
                  <img
                    src={"/braydenpeltlogo.png"}
                    alt="Brayden Pelt Logo"
                    draggable={false}
                    style={{ filter: 'none' }}
                  />
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link, idx) => {
                  if (link.type === 'link') {
                    let linkColorClass = location.hash === link.to.replace('/','') || location.pathname + location.hash === link.to
                      ? 'text-[var(--color-blue)]'
                      : 'text-[var(--color-blue)]';
                    return (
                      <a
                        key={link.label}
                        href={link.to}
                        className={`nav-link scrolled ${linkColorClass} hover:text-[var(--color-blue)] transition-colors`}
                        style={{ cursor: 'pointer' }}
                      >
                        {link.label}
                      </a>
                    );
                  } else if (link.type === 'disabled') {
                    return (
                      <span
                        key={link.label}
                        className="nav-link scrolled text-[var(--color-blue)] opacity-60 cursor-not-allowed transition-colors"
                        style={{ pointerEvents: 'none' }}
                      >
                        {link.label}
                      </span>
                    );
                  } else if (link.type === 'tel') {
                    return (
                      <a
                        key={link.label}
                        href={link.to}
                        className="nav-link scrolled text-[var(--color-blue)] hover:text-[var(--color-blue)] transition-colors"
                        style={{ cursor: 'pointer' }}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
