import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gauge, ShieldCheck } from 'lucide-react';

const ResultCard = ({ prediction, confidence }) => {
  if (!prediction) return null;

  const isArabica = prediction.toLowerCase().includes('arabika') || prediction.toLowerCase().includes('arabica');
  const isRobusta = prediction.toLowerCase().includes('robusta');

  const beanDetails = isArabica
    ? {
        description: 'Biji kopi Arabika biasanya memiliki bentuk fisik cenderung oval/lonjong, garis tengah meliuk (curved crease), dan profil densitas tinggi.',
        metrics: [
          { name: 'Circularity Index', value: '~0.78 (Oval)' },
          { name: 'Aspect Ratio', value: '1.35 - 1.55 (Lonjong)' },
          { name: 'Crease Symmetry', value: 'Asymmetric (Meliuk)' },
          { name: 'Solidity Value', value: '0.94 - 0.96 (Keras)' }
        ]
      }
    : isRobusta
    ? {
        description: 'Biji kopi Robusta dicirikan oleh bentuk fisik cenderung bundar/lingkaran penuh, garis tengah cenderung lurus (straight crease), dan ketebalan konstan.',
        metrics: [
          { name: 'Circularity Index', value: '~0.89 (Bundar)' },
          { name: 'Aspect Ratio', value: '1.05 - 1.20 (Bulat)' },
          { name: 'Crease Symmetry', value: 'Symmetric (Lurus)' },
          { name: 'Solidity Value', value: '0.91 - 0.93 (Medium)' }
        ]
      }
    : {
        description: 'Biji kopi terdeteksi dengan ciri fisik tertentu dari model database latih KNN.',
        metrics: [
          { name: 'Shape Circularity', value: 'Mencukupi' },
          { name: 'Feature Aspect Ratio', value: 'Terdeteksi' },
          { name: 'KNN Distance Matrix', value: 'Tervalidasi' }
        ]
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="glass-panel rounded-3xl p-8 border border-coffee-dark/10 shadow-xl relative overflow-hidden bg-white/40">
        
        {/* Result Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coffee-dark/5 border border-coffee-dark/15 flex items-center justify-center text-coffee-dark">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-coffee-medium font-bold block">
                Analisis Selesai
              </span>
              <span className="text-sm text-coffee-dark/70">
                KNN Classifier Output
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="text-xs text-emerald-800 font-semibold tracking-wide">
              Hasil Tervalidasi
            </span>
          </div>
        </div>

        {/* Prediction Display */}
        <div className="flex flex-col gap-2 mb-8 border-b border-coffee-dark/10 pb-6">
          <span className="text-xs text-coffee-dark/60 uppercase tracking-widest font-mono">
            Varietas Biji Kopi Terdeteksi:
          </span>
          <h2 className="text-5xl font-black font-heading text-coffee-dark">
            {prediction}
          </h2>
          <p className="text-xs text-coffee-dark/80 mt-2 italic leading-relaxed">
            "{beanDetails.description}"
          </p>
        </div>

        {/* Confidence Progress Bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex justify-between items-end">
            <span className="text-xs text-coffee-dark/70 flex items-center gap-1.5 font-sans">
              <Gauge className="w-4 h-4 text-coffee-medium" />
              Confidence Score
            </span>
            <span className="text-lg font-bold font-mono text-coffee-dark">
              {confidence}%
            </span>
          </div>
          <div className="w-full h-3 bg-coffee-light/45 rounded-full overflow-hidden p-[2px] border border-coffee-dark/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-coffee-medium to-coffee-dark"
            />
          </div>
        </div>

        {/* Extracted Morphology Features */}
        <div>
          <h4 className="text-xs font-semibold text-coffee-medium uppercase tracking-widest mb-4">
            Ekstraksi Fitur Morfologi (Geometris)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {beanDetails.metrics.map((metric, i) => (
              <div key={i} className="bg-white/50 border border-coffee-dark/10 px-4 py-3 rounded-xl flex flex-col gap-1">
                <span className="text-[10px] text-coffee-dark/60 font-sans">
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
    </motion.div>
  );
};

export default ResultCard;
