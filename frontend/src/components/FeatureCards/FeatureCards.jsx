import React from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Ruler, BrainCircuit } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <ScanFace className="w-7 h-7 text-coffee-dark" />,
      title: 'Image Preprocessing',
      desc: 'Preprocessing tingkat lanjut menggunakan OpenCV seperti Grayscale, Otsu Thresholding, Noise Removal, dan Contour Detection untuk mengisolasi objek biji kopi secara akurat.',
    },
    {
      icon: <Ruler className="w-7 h-7 text-coffee-dark" />,
      title: 'Morphology Features',
      desc: 'Ekstraksi fitur bentuk fisik geometris biji kopi, termasuk area (luas), perimeter (keliling), circularity (kebulatan), solidity, dan aspect ratio (rasio panjang-lebar).',
    },
    {
      icon: <BrainCircuit className="w-7 h-7 text-coffee-dark" />,
      title: 'K-NN Classification',
      desc: 'Klasifikasi cerdas dengan algoritma K-Nearest Neighbor (K-NN) yang membandingkan matriks morfologi biji kopi uji terhadap database latih secara real-time.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-white/30 border-y border-coffee-dark/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-medium tracking-wider">
            System Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-coffee-dark">
            Core Processing Pipeline
          </h2>
          <p className="text-coffee-dark/70 text-sm sm:text-base">
            Alur kerja pengolahan citra digital dan kecerdasan buatan untuk mengklasifikasi perbedaan varietas biji kopi berdasarkan bentuk fisik.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col items-start gap-5 relative overflow-hidden group"
            >
              <div className="w-14 h-14 rounded-2xl bg-coffee-light/40 border border-coffee-dark/10 flex items-center justify-center shadow-sm group-hover:border-coffee-medium/30 transition-colors duration-300">
                {feat.icon}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold font-heading text-coffee-dark group-hover:text-coffee-medium transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-sm text-coffee-dark/70 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
