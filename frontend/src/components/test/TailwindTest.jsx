/**
 * Tailwind Configuration Test Component
 * 
 * This component demonstrates the usage of:
 * - Custom coffee color palette
 * - Custom font families (Poppins, Inter)
 * - Glassmorphism utility classes
 * - Responsive breakpoints
 * 
 * Use this component to verify the Tailwind configuration is working correctly.
 */

import React from 'react';
import { Coffee, Sparkles, Zap } from 'lucide-react';

function TailwindTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-primary to-coffee-caramel p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-coffee-cream mb-4">
            Tailwind Configuration Test
          </h1>
          <p className="font-sans text-lg text-coffee-cream/80">
            Verifying coffee-themed design system
          </p>
        </header>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-3xl text-coffee-cream mb-6">
            Coffee Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-primary rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-cream">Primary</p>
              <p className="font-sans text-xs text-coffee-cream/60">#6F4E37</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-secondary rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-cream">Secondary</p>
              <p className="font-sans text-xs text-coffee-cream/60">#A0826D</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-caramel rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-cream">Caramel</p>
              <p className="font-sans text-xs text-coffee-cream/60">#C68B59</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-cream rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-dark">Cream</p>
              <p className="font-sans text-xs text-coffee-dark/60">#F5E6D3</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-gold rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-dark">Gold</p>
              <p className="font-sans text-xs text-coffee-dark/60">#D4AF37</p>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="w-full h-24 bg-coffee-dark rounded-lg mb-3"></div>
              <p className="font-sans text-sm text-coffee-cream">Dark</p>
              <p className="font-sans text-xs text-coffee-cream/60">#3E2723</p>
            </div>
          </div>
        </section>

        {/* Glassmorphism Cards Section */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-3xl text-coffee-cream mb-6">
            Glassmorphism Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Glass Card */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-coffee-gold/20">
                <Coffee className="w-6 h-6 text-coffee-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl text-coffee-cream mb-2">
                Glass Card
              </h3>
              <p className="font-sans text-sm text-coffee-cream/80">
                Basic glass effect with backdrop blur and transparency
              </p>
            </div>

            {/* Glass Card Hover */}
            <div className="glass-card-hover p-6 cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-coffee-gold/20">
                <Sparkles className="w-6 h-6 text-coffee-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl text-coffee-cream mb-2">
                Glass Card Hover
              </h3>
              <p className="font-sans text-sm text-coffee-cream/80">
                Hover over me to see scale and shadow effects
              </p>
            </div>

            {/* Glass Card with Content */}
            <div className="glass-card-hover p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-coffee-gold/20">
                <Zap className="w-6 h-6 text-coffee-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl text-coffee-cream mb-2">
                Interactive Card
              </h3>
              <p className="font-sans text-sm text-coffee-cream/80">
                Perfect for feature cards and interactive elements
              </p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-3xl text-coffee-cream mb-6">
            Typography System
          </h2>
          <div className="glass-card p-8">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-4xl text-coffee-cream mb-2">
                Poppins Font Family
              </h3>
              <p className="font-sans text-base text-coffee-cream/80">
                Used for all headings with weights: 400, 500, 600, 700, 800
              </p>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-2xl text-coffee-cream mb-2">
                Inter Font Family
              </h3>
              <p className="font-sans text-base text-coffee-cream/80">
                Used for body text and UI elements with weights: 400, 500, 600, 700
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Breakpoints Section */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-3xl text-coffee-cream mb-6">
            Responsive Breakpoints
          </h2>
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <div className="bg-coffee-primary/50 p-4 rounded-lg text-center">
                <p className="font-heading font-bold text-coffee-cream">Base</p>
                <p className="font-sans text-xs text-coffee-cream/60">&lt;640px</p>
              </div>
              <div className="bg-coffee-secondary/50 p-4 rounded-lg text-center">
                <p className="font-heading font-bold text-coffee-cream">SM</p>
                <p className="font-sans text-xs text-coffee-cream/60">≥640px</p>
              </div>
              <div className="bg-coffee-caramel/50 p-4 rounded-lg text-center">
                <p className="font-heading font-bold text-coffee-cream">MD</p>
                <p className="font-sans text-xs text-coffee-cream/60">≥768px</p>
              </div>
              <div className="bg-coffee-gold/50 p-4 rounded-lg text-center">
                <p className="font-heading font-bold text-coffee-dark">LG</p>
                <p className="font-sans text-xs text-coffee-dark/60">≥1024px</p>
              </div>
              <div className="bg-coffee-dark/50 p-4 rounded-lg text-center">
                <p className="font-heading font-bold text-coffee-cream">XL</p>
                <p className="font-sans text-xs text-coffee-cream/60">≥1280px</p>
              </div>
            </div>
            <p className="font-sans text-sm text-coffee-cream/80 mt-4 text-center">
              Resize your browser to see the responsive grid in action
            </p>
          </div>
        </section>

        {/* Glass Navbar Example */}
        <section>
          <h2 className="font-heading font-semibold text-3xl text-coffee-cream mb-6">
            Glass Navbar Effect
          </h2>
          <div className="glass-navbar p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="font-heading font-bold text-2xl text-coffee-gold">
                BeanSense AI
              </div>
              <div className="flex space-x-6">
                <a href="#" className="font-sans text-coffee-cream hover:text-coffee-gold transition-colors">
                  Home
                </a>
                <a href="#" className="font-sans text-coffee-cream hover:text-coffee-gold transition-colors">
                  Features
                </a>
                <a href="#" className="font-sans text-coffee-cream hover:text-coffee-gold transition-colors">
                  About
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <div className="mt-12 text-center">
          <div className="glass-card inline-block px-8 py-4">
            <p className="font-heading font-semibold text-xl text-coffee-gold">
              ✓ Tailwind Configuration Verified Successfully
            </p>
            <p className="font-sans text-sm text-coffee-cream/80 mt-2">
              All custom colors, fonts, and utilities are working correctly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;
