/**
 * Formatting Utilities
 * 
 * Functions for formatting data for display in the UI
 */

/**
 * Formats file size from bytes to human-readable format (KB or MB)
 * 
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted file size string (e.g., "1.50 MB", "250.00 KB")
 * 
 * @example
 * formatFileSize(1536000) // Returns "1.46 MB"
 * formatFileSize(512000)  // Returns "500.00 KB"
 * formatFileSize(1024)    // Returns "1.00 KB"
 */
export const formatFileSize = (bytes, decimals = 2) => {
  // Handle invalid input
  if (bytes === 0 || bytes === null || bytes === undefined) {
    return '0 Bytes';
  }

  if (bytes < 0) {
    return 'Invalid size';
  }

  const KB = 1024;
  const MB = KB * 1024;

  // Format as MB if size is 1MB or larger
  if (bytes >= MB) {
    const megabytes = bytes / MB;
    return `${megabytes.toFixed(decimals)} MB`;
  }

  // Format as KB if size is 1KB or larger
  if (bytes >= KB) {
    const kilobytes = bytes / KB;
    return `${kilobytes.toFixed(decimals)} KB`;
  }

  // Format as Bytes for very small files
  return `${bytes} Bytes`;
};

/**
 * Formats confidence score as a percentage string
 * 
 * @param {number} confidence - Confidence score (0-100)
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted confidence string (e.g., "95.50%")
 * 
 * @example
 * formatConfidence(95.5)   // Returns "95.50%"
 * formatConfidence(87.123) // Returns "87.12%"
 */
export const formatConfidence = (confidence, decimals = 2) => {
  if (confidence === null || confidence === undefined) {
    return '0.00%';
  }

  // Ensure confidence is within valid range
  const clampedConfidence = Math.max(0, Math.min(100, confidence));
  
  return `${clampedConfidence.toFixed(decimals)}%`;
};

/**
 * Formats bean type name for display (capitalizes first letter)
 * 
 * @param {string} beanType - Bean type name from API
 * @returns {string} - Formatted bean type name
 * 
 * @example
 * formatBeanType('arabica')  // Returns "Arabica"
 * formatBeanType('robusta')  // Returns "Robusta"
 */
export const formatBeanType = (beanType) => {
  if (!beanType || typeof beanType !== 'string') {
    return 'Unknown';
  }

  // Capitalize first letter and lowercase the rest
  return beanType.charAt(0).toUpperCase() + beanType.slice(1).toLowerCase();
};

/**
 * Truncates filename if it exceeds maximum length
 * 
 * @param {string} filename - Original filename
 * @param {number} maxLength - Maximum length before truncation (default: 30)
 * @returns {string} - Truncated filename with ellipsis if needed
 * 
 * @example
 * truncateFilename('very-long-coffee-bean-image-name.jpg', 20)
 * // Returns "very-long-coff...jpg"
 */
export const truncateFilename = (filename, maxLength = 30) => {
  if (!filename || filename.length <= maxLength) {
    return filename;
  }

  // Get file extension
  const lastDotIndex = filename.lastIndexOf('.');
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : '';
  const nameWithoutExtension = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;

  // Calculate how much of the name we can keep
  const availableLength = maxLength - extension.length - 3; // 3 for "..."

  if (availableLength <= 0) {
    return `...${extension}`;
  }

  return `${nameWithoutExtension.slice(0, availableLength)}...${extension}`;
};

/**
 * Formats a timestamp to a readable date string
 * 
 * @param {Date|number|string} timestamp - Timestamp to format
 * @returns {string} - Formatted date string
 * 
 * @example
 * formatTimestamp(new Date()) // Returns "Jan 15, 2025 at 3:45 PM"
 */
export const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    return date.toLocaleString('en-US', options).replace(',', ' at');
  } catch {
    return 'Invalid date';
  }
};

/**
 * Formats a number with thousand separators
 * 
 * @param {number} number - Number to format
 * @returns {string} - Formatted number string
 * 
 * @example
 * formatNumber(1234567) // Returns "1,234,567"
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  return number.toLocaleString('en-US');
};
