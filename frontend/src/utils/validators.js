/**
 * File Validation Utilities
 * 
 * Functions for validating uploaded files against format and size requirements
 */

import { ACCEPTED_FILE_FORMATS, ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_MB } from './constants';

/**
 * Validates an uploaded file against accepted formats and maximum size
 * 
 * @param {File} file - The file to validate
 * @param {string[]} acceptedFormats - Array of accepted MIME types (defaults to ACCEPTED_FILE_FORMATS)
 * @param {number} maxSizeMB - Maximum file size in megabytes (defaults to MAX_FILE_SIZE_MB)
 * @returns {string|null} - Error message if validation fails, null if validation passes
 * 
 * @example
 * const error = validateFile(file);
 * if (error) {
 *   console.error(error);
 * }
 */
export const validateFile = (file, acceptedFormats = ACCEPTED_FILE_FORMATS, maxSizeMB = MAX_FILE_SIZE_MB) => {
  // Check if file exists
  if (!file) {
    return 'No file selected. Please choose a file to upload.';
  }

  // Validate file type
  if (!acceptedFormats.includes(file.type)) {
    return `Please upload a valid image (${ACCEPTED_FILE_EXTENSIONS})`;
  }

  // Validate file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }

  // Validation passed
  return null;
};

/**
 * Checks if a file type is an accepted image format
 * 
 * @param {string} fileType - MIME type of the file
 * @param {string[]} acceptedFormats - Array of accepted MIME types (defaults to ACCEPTED_FILE_FORMATS)
 * @returns {boolean} - True if file type is accepted, false otherwise
 * 
 * @example
 * if (isValidFileType('image/jpeg')) {
 *   console.log('Valid image type');
 * }
 */
export const isValidFileType = (fileType, acceptedFormats = ACCEPTED_FILE_FORMATS) => {
  return acceptedFormats.includes(fileType);
};

/**
 * Checks if a file size is within the maximum allowed size
 * 
 * @param {number} fileSize - File size in bytes
 * @param {number} maxSizeMB - Maximum file size in megabytes (defaults to MAX_FILE_SIZE_MB)
 * @returns {boolean} - True if file size is valid, false otherwise
 * 
 * @example
 * if (isValidFileSize(file.size)) {
 *   console.log('File size is acceptable');
 * }
 */
export const isValidFileSize = (fileSize, maxSizeMB = MAX_FILE_SIZE_MB) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

/**
 * Validates multiple files at once
 * 
 * @param {File[]} files - Array of files to validate
 * @param {string[]} acceptedFormats - Array of accepted MIME types (defaults to ACCEPTED_FILE_FORMATS)
 * @param {number} maxSizeMB - Maximum file size in megabytes (defaults to MAX_FILE_SIZE_MB)
 * @returns {Object} - Object with valid files array and errors array
 * 
 * @example
 * const { validFiles, errors } = validateMultipleFiles(files);
 * if (errors.length > 0) {
 *   console.error('Some files failed validation:', errors);
 * }
 */
export const validateMultipleFiles = (files, acceptedFormats = ACCEPTED_FILE_FORMATS, maxSizeMB = MAX_FILE_SIZE_MB) => {
  const validFiles = [];
  const errors = [];

  files.forEach((file, index) => {
    const error = validateFile(file, acceptedFormats, maxSizeMB);
    if (error) {
      errors.push({ file: file.name, error, index });
    } else {
      validFiles.push(file);
    }
  });

  return { validFiles, errors };
};
