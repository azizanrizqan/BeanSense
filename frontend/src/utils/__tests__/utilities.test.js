/**
 * Utility Functions Test Suite
 * 
 * Tests for constants, validators, formatters, animations, and error mapper
 */

import { describe, it, expect } from 'vitest';
import {
  // Constants
  ACCEPTED_FILE_FORMATS,
  MAX_FILE_SIZE_MB,
  PREDICT_ENDPOINT,
  HIGH_CONFIDENCE_THRESHOLD,
  MEDIUM_CONFIDENCE_THRESHOLD,
  
  // Validators
  validateFile,
  isValidFileType,
  isValidFileSize,
  
  // Formatters
  formatFileSize,
  formatConfidence,
  formatBeanType,
  truncateFilename,
  
  // Error Mapper
  mapErrorMessage,
  getErrorSeverity,
  isRecoverableError,
  createErrorObject,
  
  // Animations
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  slideInFromRight,
} from '../index';

describe('Constants', () => {
  it('should have correct accepted file formats', () => {
    expect(ACCEPTED_FILE_FORMATS).toEqual(['image/jpeg', 'image/png', 'image/jpg']);
  });

  it('should have correct max file size', () => {
    expect(MAX_FILE_SIZE_MB).toBe(10);
  });

  it('should have API endpoint defined', () => {
    expect(PREDICT_ENDPOINT).toBe('/predict');
  });

  it('should have confidence thresholds defined', () => {
    expect(HIGH_CONFIDENCE_THRESHOLD).toBe(80);
    expect(MEDIUM_CONFIDENCE_THRESHOLD).toBe(50);
  });
});

describe('Validators', () => {
  describe('validateFile', () => {
    it('should return null for valid JPEG file', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB
      expect(validateFile(file)).toBeNull();
    });

    it('should return error for invalid file type', () => {
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const error = validateFile(file);
      expect(error).toContain('valid image');
    });

    it('should return error for file exceeding max size', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 }); // 11MB
      const error = validateFile(file);
      expect(error).toContain('less than');
    });

    it('should return error for null file', () => {
      const error = validateFile(null);
      expect(error).toContain('No file selected');
    });
  });

  describe('isValidFileType', () => {
    it('should return true for JPEG', () => {
      expect(isValidFileType('image/jpeg')).toBe(true);
    });

    it('should return true for PNG', () => {
      expect(isValidFileType('image/png')).toBe(true);
    });

    it('should return false for PDF', () => {
      expect(isValidFileType('application/pdf')).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('should return true for 5MB file', () => {
      expect(isValidFileSize(5 * 1024 * 1024)).toBe(true);
    });

    it('should return false for 15MB file', () => {
      expect(isValidFileSize(15 * 1024 * 1024)).toBe(false);
    });
  });
});

describe('Formatters', () => {
  describe('formatFileSize', () => {
    it('should format bytes to KB', () => {
      expect(formatFileSize(1024)).toBe('1.00 KB');
    });

    it('should format bytes to MB', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1.00 MB');
    });

    it('should format large MB values', () => {
      expect(formatFileSize(5.5 * 1024 * 1024)).toBe('5.50 MB');
    });

    it('should handle 0 bytes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    it('should handle small byte values', () => {
      expect(formatFileSize(512)).toBe('512 Bytes');
    });
  });

  describe('formatConfidence', () => {
    it('should format confidence as percentage', () => {
      expect(formatConfidence(95.5)).toBe('95.50%');
    });

    it('should handle whole numbers', () => {
      expect(formatConfidence(87)).toBe('87.00%');
    });

    it('should clamp values above 100', () => {
      expect(formatConfidence(105)).toBe('100.00%');
    });

    it('should clamp values below 0', () => {
      expect(formatConfidence(-5)).toBe('0.00%');
    });
  });

  describe('formatBeanType', () => {
    it('should capitalize bean type', () => {
      expect(formatBeanType('arabica')).toBe('Arabica');
    });

    it('should handle uppercase input', () => {
      expect(formatBeanType('ROBUSTA')).toBe('Robusta');
    });

    it('should handle mixed case', () => {
      expect(formatBeanType('ArAbIcA')).toBe('Arabica');
    });

    it('should handle null input', () => {
      expect(formatBeanType(null)).toBe('Unknown');
    });
  });

  describe('truncateFilename', () => {
    it('should not truncate short filenames', () => {
      expect(truncateFilename('test.jpg', 30)).toBe('test.jpg');
    });

    it('should truncate long filenames', () => {
      const result = truncateFilename('very-long-coffee-bean-image-name.jpg', 20);
      expect(result).toContain('...');
      expect(result).toContain('.jpg');
      expect(result.length).toBeLessThanOrEqual(20);
    });
  });
});

describe('Error Mapper', () => {
  describe('mapErrorMessage', () => {
    it('should map Indonesian "File tidak ditemukan" to English', () => {
      const result = mapErrorMessage('File tidak ditemukan');
      expect(result).toBe('No file was uploaded. Please try again.');
    });

    it('should map "File kosong" to English', () => {
      const result = mapErrorMessage('File kosong');
      expect(result).toBe('The uploaded file is empty. Please select a valid image.');
    });

    it('should map "Gagal membaca gambar" to English', () => {
      const result = mapErrorMessage('Gagal membaca gambar');
      expect(result).toBe('Failed to read the image. Please upload a different file.');
    });

    it('should map "Contour tidak ditemukan" to English', () => {
      const result = mapErrorMessage('Contour tidak ditemukan');
      expect(result).toBe('No coffee bean detected. Please upload a clearer image with a visible coffee bean.');
    });

    it('should handle network errors', () => {
      const result = mapErrorMessage('Network error occurred');
      expect(result).toContain('Unable to connect');
    });

    it('should handle null error', () => {
      const result = mapErrorMessage(null);
      expect(result).toContain('unexpected error');
    });
  });

  describe('getErrorSeverity', () => {
    it('should return critical for server errors', () => {
      expect(getErrorSeverity('Server error occurred')).toBe('critical');
    });

    it('should return warning for invalid file errors', () => {
      expect(getErrorSeverity('Invalid file format')).toBe('warning');
    });

    it('should return info for no coffee bean detected', () => {
      expect(getErrorSeverity('No coffee bean detected')).toBe('info');
    });
  });

  describe('isRecoverableError', () => {
    it('should return true for network errors', () => {
      expect(isRecoverableError('Network error')).toBe(true);
    });

    it('should return true for file validation errors', () => {
      expect(isRecoverableError('Invalid file')).toBe(true);
    });

    it('should return false for forbidden errors', () => {
      expect(isRecoverableError('Access forbidden')).toBe(false);
    });
  });

  describe('createErrorObject', () => {
    it('should create complete error object', () => {
      const errorObj = createErrorObject('Contour tidak ditemukan');
      expect(errorObj).toHaveProperty('message');
      expect(errorObj).toHaveProperty('severity');
      expect(errorObj).toHaveProperty('recoverable');
      expect(errorObj).toHaveProperty('suggestion');
      expect(errorObj).toHaveProperty('originalError');
      expect(errorObj.originalError).toBe('Contour tidak ditemukan');
    });
  });
});

describe('Animations', () => {
  it('should have fadeInUp variant', () => {
    expect(fadeInUp).toHaveProperty('hidden');
    expect(fadeInUp).toHaveProperty('visible');
    expect(fadeInUp.hidden).toHaveProperty('opacity', 0);
    expect(fadeInUp.hidden).toHaveProperty('y', 50);
  });

  it('should have fadeIn variant', () => {
    expect(fadeIn).toHaveProperty('hidden');
    expect(fadeIn).toHaveProperty('visible');
    expect(fadeIn.hidden).toHaveProperty('opacity', 0);
  });

  it('should have scaleIn variant', () => {
    expect(scaleIn).toHaveProperty('hidden');
    expect(scaleIn).toHaveProperty('visible');
    expect(scaleIn.hidden).toHaveProperty('scale', 0.8);
  });

  it('should have staggerContainer variant', () => {
    expect(staggerContainer).toHaveProperty('hidden');
    expect(staggerContainer).toHaveProperty('visible');
    expect(staggerContainer.visible.transition).toHaveProperty('staggerChildren');
  });

  it('should have slideInFromRight variant', () => {
    expect(slideInFromRight).toHaveProperty('hidden');
    expect(slideInFromRight).toHaveProperty('visible');
    expect(slideInFromRight.hidden).toHaveProperty('x', 100);
  });
});
