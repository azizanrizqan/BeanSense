/**
 * Error Message Mapper
 * 
 * Converts backend error messages (Indonesian) to user-friendly English messages
 * Provides consistent error handling across the application
 */

/**
 * Maps backend error messages to user-friendly English messages
 * 
 * @param {string} backendError - Error message from the backend API
 * @returns {string} - User-friendly error message in English
 * 
 * @example
 * const userMessage = mapErrorMessage('Contour tidak ditemukan');
 * // Returns: "No coffee bean detected. Please upload a clearer image with a visible coffee bean."
 */
export const mapErrorMessage = (backendError) => {
  // Handle null or undefined errors
  if (!backendError) {
    return 'An unexpected error occurred. Please try again.';
  }

  // Convert to lowercase for case-insensitive matching
  const errorLower = backendError.toLowerCase().trim();

  // Map Indonesian backend errors to English user messages
  const errorMap = {
    // File not found error
    'file tidak ditemukan': 'No file was uploaded. Please try again.',
    
    // Empty file error
    'file kosong': 'The uploaded file is empty. Please select a valid image.',
    
    // Failed to read image error
    'gagal membaca gambar': 'Failed to read the image. Please upload a different file.',
    
    // Contour not found error (no coffee bean detected)
    'contour tidak ditemukan': 'No coffee bean detected. Please upload a clearer image with a visible coffee bean.',
  };

  // Check for exact matches first
  if (errorMap[errorLower]) {
    return errorMap[errorLower];
  }

  // Check for partial matches (in case error message has additional text)
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorLower.includes(key)) {
      return value;
    }
  }

  // Handle common network errors
  if (errorLower.includes('network') || errorLower.includes('fetch')) {
    return 'Unable to connect to server. Please check your connection and try again.';
  }

  if (errorLower.includes('timeout')) {
    return 'Request timed out. Please check your connection and try again.';
  }

  if (errorLower.includes('cors')) {
    return 'Connection error. Please contact support if this persists.';
  }

  // Handle HTTP status code errors
  if (errorLower.includes('404')) {
    return 'Service not found. Please contact support.';
  }

  if (errorLower.includes('500') || errorLower.includes('internal server')) {
    return 'Server error. Please try again later.';
  }

  if (errorLower.includes('503') || errorLower.includes('service unavailable')) {
    return 'Service temporarily unavailable. Please try again later.';
  }

  // Return original error if no mapping found (fallback)
  return backendError || 'An unexpected error occurred. Please try again.';
};

/**
 * Determines error severity level for UI styling
 * 
 * @param {string} errorMessage - Error message (original or mapped)
 * @returns {'critical' | 'warning' | 'info'} - Error severity level
 * 
 * @example
 * const severity = getErrorSeverity('Server error');
 * // Returns: 'critical'
 */
export const getErrorSeverity = (errorMessage) => {
  if (!errorMessage) {
    return 'info';
  }

  const messageLower = errorMessage.toLowerCase();

  // Critical errors (server/network issues)
  if (
    messageLower.includes('server') ||
    messageLower.includes('network') ||
    messageLower.includes('connection') ||
    messageLower.includes('timeout') ||
    messageLower.includes('unavailable')
  ) {
    return 'critical';
  }

  // Warning errors (user action needed)
  if (
    messageLower.includes('invalid') ||
    messageLower.includes('failed to read') ||
    messageLower.includes('empty')
  ) {
    return 'warning';
  }

  // Info errors (user guidance)
  if (
    messageLower.includes('no coffee bean') ||
    messageLower.includes('clearer image') ||
    messageLower.includes('no file')
  ) {
    return 'info';
  }

  // Default to warning
  return 'warning';
};

/**
 * Checks if an error is recoverable (user can retry)
 * 
 * @param {string} errorMessage - Error message (original or mapped)
 * @returns {boolean} - True if error is recoverable, false otherwise
 * 
 * @example
 * if (isRecoverableError(error)) {
 *   showRetryButton();
 * }
 */
export const isRecoverableError = (errorMessage) => {
  if (!errorMessage) {
    return true; // Unknown errors are assumed recoverable
  }

  const messageLower = errorMessage.toLowerCase();

  // Non-recoverable errors (require different action)
  const nonRecoverableKeywords = [
    'not supported',
    'forbidden',
    'unauthorized',
    'contact support'
  ];

  return !nonRecoverableKeywords.some(keyword => messageLower.includes(keyword));
};

/**
 * Generates a helpful suggestion based on the error type
 * 
 * @param {string} errorMessage - Error message (original or mapped)
 * @returns {string} - Helpful suggestion for the user
 * 
 * @example
 * const suggestion = getErrorSuggestion('No coffee bean detected');
 * // Returns: "Try uploading an image with better lighting and a clear view of the coffee bean."
 */
export const getErrorSuggestion = (errorMessage) => {
  if (!errorMessage) {
    return 'Please try again or contact support if the issue persists.';
  }

  const messageLower = errorMessage.toLowerCase();

  // Suggestions based on error type
  if (messageLower.includes('no coffee bean') || messageLower.includes('contour')) {
    return 'Try uploading an image with better lighting and a clear view of the coffee bean.';
  }

  if (messageLower.includes('failed to read') || messageLower.includes('invalid')) {
    return 'Make sure the image file is not corrupted and is in JPEG, PNG, or JPG format.';
  }

  if (messageLower.includes('empty') || messageLower.includes('no file')) {
    return 'Please select a valid image file from your device.';
  }

  if (messageLower.includes('network') || messageLower.includes('connection')) {
    return 'Check your internet connection and try again.';
  }

  if (messageLower.includes('server') || messageLower.includes('unavailable')) {
    return 'The service may be temporarily down. Please try again in a few moments.';
  }

  if (messageLower.includes('timeout')) {
    return 'The request took too long. Try with a smaller image or check your connection.';
  }

  // Default suggestion
  return 'Please try again or contact support if the issue persists.';
};

/**
 * Creates a complete error object with mapped message, severity, and suggestion
 * 
 * @param {string} backendError - Error message from the backend API
 * @returns {Object} - Complete error object with message, severity, recoverable, and suggestion
 * 
 * @example
 * const errorInfo = createErrorObject('Contour tidak ditemukan');
 * // Returns: {
 * //   message: "No coffee bean detected...",
 * //   severity: "info",
 * //   recoverable: true,
 * //   suggestion: "Try uploading an image..."
 * // }
 */
export const createErrorObject = (backendError) => {
  const message = mapErrorMessage(backendError);
  
  return {
    message,
    severity: getErrorSeverity(message),
    recoverable: isRecoverableError(message),
    suggestion: getErrorSuggestion(message),
    originalError: backendError
  };
};
