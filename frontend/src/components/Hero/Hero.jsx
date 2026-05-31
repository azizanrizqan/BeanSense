import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = ({ onStartClick, onCardClick }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column - Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coffee-medium/10 border border-coffee-medium/25 text-coffee-dark text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-coffee-medium" />
            Image Processing + KNN Model
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading leading-tight tracking-tight text-coffee-dark">
              BeanSense AI
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-coffee-medium mt-2">
              Klasifikasi Perbedaan Biji Kopi Berdasarkan Bentuk
            </h2>
            <p className="text-xs sm:text-sm text-coffee-dark/80 font-medium tracking-wide uppercase mt-1">
              Menggunakan Metode Morphology dan K-NN
            </p>
          </div>

          <p className="text-coffee-dark/70 text-sm sm:text-base leading-relaxed max-w-xl">
            Sistem cerdas untuk mengidentifikasi varietas biji kopi berdasarkan parameter morfologi fisik geometris menggunakan algoritma K-Nearest Neighbor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={onStartClick}
              className="glow-btn px-8 py-4 rounded-xl bg-coffee-dark text-cream-light font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Mulai Klasifikasi
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-4 rounded-xl bg-transparent border border-coffee-dark/20 text-coffee-dark hover:bg-coffee-dark/5 font-bold text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Pelajari Teknologi
            </a>
          </div>
        </div>

        {/* Right Column - Capsule Cards (Clickable buttons) */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg">
            
            {/* ARABICA Capsule Card */}
            <button
              onClick={() => onCardClick?.('arabica')}
              className="bg-coffee-light text-coffee-dark rounded-full aspect-[1/2.2] min-h-[300px] sm:min-h-[360px] md:min-h-[400px] py-10 px-2 sm:px-4 flex flex-col items-center justify-between shadow-lg border border-coffee-dark/5 transition-transform duration-300 hover:scale-105 cursor-pointer text-center"
            >
              {/* Coffee Bean SVG */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-coffee-dark">
                <svg className="w-full h-full stroke-[1.2]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <path d="M25 50 C25 25, 75 25, 75 50 C75 75, 25 75, 25 50 Z" />
                  <path d="M40 25 C45 35, 55 45, 50 50 C45 55, 55 65, 60 75" />
                </svg>
              </div>

              {/* Title & Divider */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 sm:w-8 h-[1px] bg-coffee-900/60" />
                <span className="text-xs sm:text-sm font-bold tracking-widest font-heading">
                  ARABICA
                </span>
              </div>

              {/* 3x4 Dot Matrix */}
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5 opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-coffee-dark" />
                ))}
              </div>
            </button>

            {/* ROBUSTA Capsule Card */}
            <button
              onClick={() => onCardClick?.('robusta')}
              className="bg-coffee-medium text-cream-light rounded-full aspect-[1/2.2] min-h-[300px] sm:min-h-[360px] md:min-h-[400px] py-10 px-2 sm:px-4 flex flex-col items-center justify-between shadow-lg border border-coffee-medium/10 transition-transform duration-300 hover:scale-105 cursor-pointer text-center"
            >
              {/* Branch Leaf SVG */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-cream-light">
                <svg className="w-full h-full stroke-[1.2]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <path d="M50 85 L50 20" />
                  <path d="M50 65 C33 60, 28 45, 50 40 C72 45, 67 60, 50 65 Z" />
                  <path d="M50 45 C36 40, 32 25, 50 20 C68 25, 64 40, 50 45 Z" />
                  <circle cx="50" cy="55" r="4" fill="currentColor" />
                  <circle cx="45" cy="52" r="3" fill="currentColor" />
                  <circle cx="55" cy="52" r="3" fill="currentColor" />
                  <circle cx="50" cy="48" r="4" fill="currentColor" />
                </svg>
              </div>

              {/* Title & Divider */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 sm:w-8 h-[1px] bg-cream-light/60" />
                <span className="text-xs sm:text-sm font-bold tracking-widest font-heading">
                  ROBUSTA
                </span>
              </div>

              {/* 3x4 Dot Matrix */}
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5 opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cream-light" />
                ))}
              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
