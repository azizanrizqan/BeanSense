import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, FileImage, AlertTriangle } from 'lucide-react';

const PredictionCard = ({ onPredict, loading, error, clearError }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      clearError?.();
    } else {
      alert('Tolong unggah file gambar yang valid (PNG, JPG, JPEG).');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    clearError?.();
  };

  const handleSubmit = () => {
    if (!file) return;
    onPredict(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 border border-coffee-dark/10 shadow-lg relative overflow-hidden">
        
        <div className="text-center mb-8 flex flex-col gap-2">
          <h3 className="text-2xl font-bold font-heading text-coffee-dark">
            Image Classifier Console
          </h3>
          <p className="text-sm text-coffee-dark/75">
            Unggah citra biji kopi tunggal untuk menganalisis parameter bentuk dan memprediksi jenisnya.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={!preview ? onButtonClick : undefined}
          className={`relative min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-all duration-300 ${
            preview ? 'cursor-default' : 'cursor-pointer'
          } ${
            dragActive 
              ? 'border-coffee-medium bg-coffee-light/20 shadow-md' 
              : 'border-coffee-dark/15 bg-white/30 hover:border-coffee-medium/40 hover:bg-white/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={loading}
          />

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-coffee-light/50 flex items-center justify-center border border-coffee-dark/10 text-coffee-dark">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-coffee-dark">
                    Seret & taruh gambar biji kopi di sini
                  </p>
                  <p className="text-xs text-coffee-dark/65 mt-1">
                    atau klik untuk menjelajahi file (PNG, JPG, JPEG)
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="image-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative flex flex-col items-center"
              >
                <img
                  src={preview}
                  alt="Coffee bean preview"
                  className="max-h-[260px] rounded-xl object-contain border border-coffee-dark/10 shadow-md"
                />
                
                {/* Delete button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-50/90 border border-rose-200/80 hover:bg-rose-100 flex items-center justify-center text-rose-600 shadow-md transition-colors cursor-pointer"
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Display Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-rose-800">
                  Classification Failed
                </p>
                <p className="text-xs text-rose-700 mt-0.5">
                  {error}
                </p>
              </div>
              <button
                onClick={clearError}
                className="text-rose-600 hover:text-rose-800 text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex gap-4"
          >
            <button
              onClick={handleClear}
              disabled={loading}
              className="flex-1 py-4 rounded-xl border border-coffee-dark/20 text-coffee-dark hover:bg-coffee-dark/5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              Hapus Gambar
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="glow-btn flex-[2] py-4 rounded-xl bg-coffee-dark text-cream-light font-bold text-sm tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cream-light border-t-transparent rounded-full animate-spin" />
                  Menganalisis Citra...
                </>
              ) : (
                <>
                  Klasifikasikan Biji Kopi
                  <FileImage className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PredictionCard;
