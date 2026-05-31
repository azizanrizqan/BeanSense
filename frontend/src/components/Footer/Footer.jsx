import React from 'react';
import { Coffee, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-cream-light border-t border-coffee-dark/10 py-8 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-coffee-dark/60">
        
        {/* Brand Left */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-coffee-dark flex items-center justify-center">
            <Coffee className="w-3.5 h-3.5 text-cream-light stroke-[2.5]" />
          </div>
          <span className="font-bold font-heading text-coffee-dark">
            BeanSense AI
          </span>
          <span className="text-[10px] text-coffee-dark/40 border-l border-coffee-dark/20 pl-2">
            KNN Coffee Classifier
          </span>
        </div>

        {/* Copy Right & Crafted Right */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-medium">
          <p>© {new Date().getFullYear()} BeanSense AI. All rights reserved.</p>
          <span className="hidden sm:inline text-coffee-dark/20">|</span>
          <div className="flex items-center gap-1">
            <span>RGB Crafted for</span>
            <span>IMAGE PROCESSING</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
