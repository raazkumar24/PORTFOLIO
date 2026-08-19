import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';
import { GlassSurface } from './GlassSurface';

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home',       href: '/' },
    { name: 'About',      href: '/about' },
    { name: 'Services',   href: '/services' },
    { name: 'Projects',   href: '/projects' },
    { name: 'Experience', href: '/experience' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Scrolled backdrop */}
        {/* <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6,7,9,0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--theme-border)',
            }}
          />
        </div> */}

        <div className="container mx-auto px-5 sm:px-8 md:px-12 flex justify-between items-center relative z-10">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
              RS
            </div>
          </Link>

          {/* Desktop Nav — single glass pill (original style) */}
          <GlassSurface
            as="nav"
            radius={25}
            edgeWidth={16}
            strength={22}
            className="hidden md:flex items-center gap-1 px-2 py-2"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive ? 'text-black' : 'text-text-secondary hover:text-white'
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
          </GlassSurface>

          {/* Right side: Hire Me */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton>
              <GlassSurface
                as={Link}
                to="/contact"
                radius={999}
                edgeWidth={14}
                strength={22}
                tint="rgba(61,216,208,0.1)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 20px',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#3dd8d0',
                  borderColor: 'rgba(61,216,208,0.3)',
                  textDecoration: 'none',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan inline-block animate-pulse" />
                Hire Me
              </GlassSurface>
            </MagneticButton>
          </div>

          {/* Mobile: Hamburger only */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1.5px] origin-center transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
                style={{ background: 'var(--theme-text)' }}
              />
              <span
                className={`block w-4 h-[1.5px] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100'}`}
                style={{ background: 'var(--theme-text)' }}
              />
              <span
                className={`block w-6 h-[1.5px] origin-center transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
                style={{ background: 'var(--theme-text)' }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ 
              clipPath: 'circle(0% at 90% 40px)',
              WebkitClipPath: 'circle(0% at 90% 40px)'
            }}
            animate={{ 
              clipPath: 'circle(150% at 90% 40px)',
              WebkitClipPath: 'circle(150% at 90% 40px)'
            }}
            exit={{ 
              clipPath: 'circle(0% at 90% 40px)',
              WebkitClipPath: 'circle(0% at 90% 40px)'
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              background: 'rgba(6,7,9,0.98)',
              willChange: 'transform, clip-path',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center px-10 md:hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="aurora-blur w-96 h-96 bg-accent-cyan top-[-10%] left-[-10%]" />
              <div className="aurora-blur w-96 h-96 bg-accent-purple bottom-[-10%] right-[-10%]" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 w-full">
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--theme-text-muted)' }}>
                Navigation
              </p>
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
                      className="block text-3xl font-heading font-bold tracking-tighter transition-colors duration-300 hover-underline"
                      style={{ color: isActive ? '#3dd8d0' : 'var(--theme-text)' }}
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
              className="relative z-10 mt-16 text-sm"
              style={{ color: 'var(--theme-text-muted)' }}
            >

              raazverma625@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
