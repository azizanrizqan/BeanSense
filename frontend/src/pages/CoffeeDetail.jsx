import React from 'react';
import { ArrowLeft, Cpu, Globe, Thermometer, Shield } from 'lucide-react';

const CoffeeDetail = ({ beanType, onBack }) => {
  // Safe fallback if beanType is empty
  const type = beanType ? beanType.toLowerCase() : 'arabica';

  const details = {
    arabica: {
      name: 'Arabika (Coffea Arabica)',
      origin: 'Dataran Tinggi Ethiopia',
      elevation: '1.000 - 2.000 mdpl',
      temp: '15°C - 24°C',
      caffeine: '1.1% - 1.5%',
      flavor: 'Asam (Acidity) tinggi, aroma floral, buah-buahan (fruity), body ringan.',
      desc: 'Biji kopi Arabika menyumbang sekitar 60-70% produksi kopi dunia. Tanaman Arabika membutuhkan iklim yang sejuk dengan curah hujan yang stabil dan cenderung lebih sensitif terhadap hama penyakit karat daun (Hemileia vastatrix).',
      shape: 'Bentuk biji cenderung lonjong (oval), pipih, dengan celah garis tengah meliuk/berkelok (S-shape crease).',
      metrics: [
        { name: 'Circularity Index', value: '0.75 - 0.82 (Cenderung Lonjong)' },
        { name: 'Aspect Ratio (L/W)', value: '1.35 - 1.55 (Asimetris Memanjang)' },
        { name: 'Solidity', value: '0.94 - 0.96 (Kepadatan Tinggi)' },
        { name: 'Crease Curve', value: 'Meliuk / Curved' }
      ],
      svg: (
        <svg className="w-48 h-48 stroke-[1.2] text-coffee-dark" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M25 50 C25 25, 75 25, 75 50 C75 75, 25 75, 25 50 Z" />
          <path d="M40 25 C45 35, 55 45, 50 50 C45 55, 55 65, 60 75" />
        </svg>
      )
    },
    robusta: {
      name: 'Robusta (Coffea Canephora)',
      origin: 'Cekungan Kongo, Afrika Tengah',
      elevation: '0 - 800 mdpl',
      temp: '24°C - 30°C',
      caffeine: '1.8% - 2.5%',
      flavor: 'Pahit (Bitter) tebal, aroma kayu (woody), cokelat gelap, body sangat tebal.',
      desc: 'Robusta memiliki ketahanan tinggi terhadap penyakit karat daun dan dapat tumbuh di dataran rendah yang bersuhu hangat. Memiliki rasa yang lebih pahit dan pekat karena kandungan kafein dan asam klorogenat yang lebih tinggi dibandingkan Arabika.',
      shape: 'Bentuk biji cenderung bulat (circular), tebal, dengan celah garis tengah yang relatif lurus (straight crease).',
      metrics: [
        { name: 'Circularity Index', value: '0.86 - 0.93 (Cenderung Bulat)' },
        { name: 'Aspect Ratio (L/W)', value: '1.05 - 1.20 (Hampir Simetris)' },
        { name: 'Solidity', value: '0.91 - 0.93 (Kepadatan Sedang)' },
        { name: 'Crease Curve', value: 'Cenderung Lurus / Straight' }
      ],
      svg: (
        <svg className="w-48 h-48 stroke-[1.2] text-coffee-medium" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M50 85 L50 20" />
          <path d="M50 65 C33 60, 28 45, 50 40 C72 45, 67 60, 50 65 Z" />
          <path d="M50 45 C36 40, 32 25, 50 20 C68 25, 64 40, 50 45 Z" />
          <circle cx="50" cy="55" r="4" fill="currentColor" />
          <circle cx="45" cy="52" r="3" fill="currentColor" />
          <circle cx="55" cy="52" r="3" fill="currentColor" />
          <circle cx="50" cy="48" r="4" fill="currentColor" />
        </svg>
      )
    }
  };

  const bean = details[type] || details.arabica;

  return (
    <div className="relative min-h-screen bg-cream-light text-coffee-dark pt-28 pb-16 px-6 md:px-12 selection:bg-coffee-medium selection:text-cream-light">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-coffee-medium hover:text-coffee-dark transition-colors duration-200 cursor-pointer mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Dashboard
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual & Stats */}
          <div className="md:col-span-5 flex flex-col items-center gap-6">
            <div className="w-full aspect-square rounded-3xl bg-white/40 border border-coffee-dark/10 shadow-lg flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-coffee-medium">
                Line Art Schema
              </div>
              {bean.svg}
            </div>

            {/* Quick Stats Grid */}
            <div className="w-full grid grid-cols-1 gap-3">
              <div className="bg-white/40 border border-coffee-dark/5 p-4 rounded-2xl flex items-center gap-3">
                <Globe className="w-5 h-5 text-coffee-medium shrink-0" />
                <div>
                  <span className="block text-[10px] text-coffee-dark/50 uppercase font-semibold">Asal Habitat</span>
                  <span className="text-xs font-bold text-coffee-dark">{bean.origin}</span>
                </div>
              </div>
              <div className="bg-white/40 border border-coffee-dark/5 p-4 rounded-2xl flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-coffee-medium shrink-0" />
                <div>
                  <span className="block text-[10px] text-coffee-dark/50 uppercase font-semibold">Ketinggian Tumbuh</span>
                  <span className="text-xs font-bold text-coffee-dark">{bean.elevation}</span>
                </div>
              </div>
              <div className="bg-white/40 border border-coffee-dark/5 p-4 rounded-2xl flex items-center gap-3">
                <Shield className="w-5 h-5 text-coffee-medium shrink-0" />
                <div>
                  <span className="block text-[10px] text-coffee-dark/50 uppercase font-semibold">Kandungan Kafein</span>
                  <span className="text-xs font-bold text-coffee-dark">{bean.caffeine}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-coffee-medium">
                Profil Detail Varietas
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-heading text-coffee-dark mt-1">
                {bean.name}
              </h1>
            </div>

            <div className="bg-white/40 border border-coffee-dark/10 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-coffee-dark uppercase tracking-wider">
                  Deskripsi Umum
                </h3>
                <p className="text-xs sm:text-sm text-coffee-dark/80 mt-2 leading-relaxed">
                  {bean.desc}
                </p>
              </div>

              <hr className="border-coffee-dark/10" />

              <div>
                <h3 className="text-sm font-bold text-coffee-dark uppercase tracking-wider">
                  Cita Rasa & Aroma
                </h3>
                <p className="text-xs sm:text-sm text-coffee-dark/80 mt-2 leading-relaxed font-semibold">
                  {bean.flavor}
                </p>
              </div>
            </div>

            {/* Morphological Parameters */}
            <div>
              <h3 className="text-sm font-bold text-coffee-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-coffee-medium" />
                Karakteristik Fisik Morfologi Citra
              </h3>
              
              <div className="p-4 rounded-3xl bg-coffee-dark/5 border border-coffee-dark/5 mb-4">
                <p className="text-xs text-coffee-dark/80 leading-relaxed">
                  {bean.shape}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {bean.metrics.map((metric, i) => (
                  <div key={i} className="bg-white/50 border border-coffee-dark/10 px-4 py-3 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] text-coffee-dark/50 font-sans font-semibold">
                      {metric.name}
                    </span>
                    <span className="text-xs font-bold text-coffee-dark font-mono">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CoffeeDetail;
