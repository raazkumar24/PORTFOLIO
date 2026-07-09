import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-3'
          : 'py-5'
          }`}
      >
        {/* Blur bg pill */}
        <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="absolute inset-0 bg-bg-dark/70 backdrop-blur-2xl border-b border-white/[0.04]" />
        </div>

        <div className="container mx-auto px-5 sm:px-8 md:px-12 flex justify-between items-center relative z-10">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold text-white">
              RS
            </div>
            {/* <span className="text-base font-heading font-bold text-white tracking-tight hidden sm:block">
              Raj Shekhar<span className="text-accent-cyan">.</span>
            </span> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-sm rounded-full px-2 py-2 border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                    ? 'text-black'
                    : 'text-text-secondary hover:text-white'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-semibold uppercase tracking-wider hover:bg-accent-cyan hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,216,208,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan inline-block animate-pulse" />
            Hire Me
          </Link>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg-dark/98 backdrop-blur-2xl flex flex-col items-start justify-center px-10 md:hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="aurora-blur w-96 h-96 bg-accent-cyan top-[-10%] left-[-10%]" />
              <div className="aurora-blur w-96 h-96 bg-accent-purple bottom-[-10%] right-[-10%]" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 w-full">
              <p className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-4">Navigation</p>
              {[...navLinks, { name: 'Contact', href: '/contact' }].map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.05 * index + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.href}
                      className={`block text-3xl font-heading font-bold tracking-tighter transition-colors duration-300 hover-underline ${isActive ? 'text-accent-cyan' : 'text-white hover:text-accent-cyan'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative z-10 mt-16 text-text-secondary text-sm"
            >
              hello@rajshekhar.dev
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
