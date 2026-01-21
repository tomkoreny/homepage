'use client';

import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-card-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <a href="#home" className="inline-block text-3xl font-bold gradient-text mb-6">
            Tom Korený
          </a>

          {/* Social links */}
          <div className="mb-8">
            <SocialLinks />
          </div>

          {/* Copyright */}
          <p className="text-foreground/60 text-sm">
            © {currentYear} Tom Korený. Built with{' '}
            <span className="text-orange">Next.js</span> &{' '}
            <span className="text-blue">Tailwind CSS</span>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
