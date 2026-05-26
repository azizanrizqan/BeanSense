/**
 * API Service Layer for BeanSense AI
 * 
 * This module provides a centralized API service for communicating with the
 * BeanSense backend. It handles HTTP requests, error handling, and response
 * transformation.
 */

import axios from 'axios';

// =========================
// API CONFIGURATION
// =========================

/**
 * Base URL for the API, loaded from environment variables
 * Defaults to localhost:5000 if not specified
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Axios instance configured with base URL and timeout
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout as per requirement 8.4
  headers: {
    'Accept': 'application/json',
  }
});

// =========================
// RESPONSE INTERCEPTOR
// =========================

/**
 * Response interceptor to transform backend error messages
 * Maps Indonesian error messages to user-friendly English messages
 */
apiClient.interceptors.response.use(
  // Success response - pass through
  (response) => response,
  
  // Error response - transform error messages
  (error) => {
    if (error.response) {
      // Backend returned an error response
      const backendError = error.response.data?.error;
      
      // Transform Indonesian error messages to English
      const errorMessageMap = {
        'File tidak ditemukan': 'No file was uploaded. Please try again.',
        'File kosong': 'The uploaded file is empty. Please select a valid image.',
        'Gagal membaca gambar': 'Failed to read the image. Please upload a different file.',
        'Contour tidak ditemukan': 'No coffee bean detected. Please upload a clearer image with a visible coffee bean.'
      };
      
      // Use mapped message or original message
      const transformedMessage = errorMessageMap[backendError] || backendError || 'Classification failed';
      
      // Create a new error with transformed message
      const transformedError = new Error(transformedMessage);
      transformedError.response = error.response;
      transformedError.originalError = backendError;
      
      return Promise.reject(transformedError);
    } else if (error.request) {
      // Network error - request was made but no response received
      const networkError = new Error('Unable to connect to server. Please check your connection and try again later.');
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      const timeoutError = new Error('Request timed out. Please try again.');
      timeoutError.isTimeout = true;
      return Promise.reject(timeoutError);
    } else {
      // Other errors
      const unknownError = new Error('An unexpected error occurred. Please try again.');
      return Promise.reject(unknownError);
    }
  }
);

// =========================
// API FUNCTIONS
// =========================

/**
 * Send image to backend for coffee bean classification
 * 
 * @param {File} file - Image file to classify (JPEG, PNG, JPG)
 * @returns {Promise<{prediction: string, confidence: number}>} Prediction result
 * @throws {Error} Network error, timeout, or API error with user-friendly message
 * 
 * @example
 * try {
 *   const result = await predictBean(imageFile);
 *   console.log(`Prediction: ${result.prediction}, Confidence: ${result.confidence}%`);
 * } catch (error) {
 *   console.error('Classification failed:', error.message);
 * }
 */
export const predictBean = async (file) => {
  // Validate input
  if (!file) {
    throw new Error('No file provided');
  }

  if (!(file instanceof File)) {
    throw new Error('Invalid file object');
  }

  // Create FormData and append the file
  const formData = new FormData();
  formData.append('file', file);

  try {
    // Send POST request to /predict endpoint
    const response = await apiClient.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Error is already transformed by the interceptor
    throw error;
  }
};

/**
 * Check if the API server is running
 * 
 * @returns {Promise<boolean>} True if server is reachable
 */
export const checkServerHealth = async () => {
  try {
    const response = await apiClient.get('/');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Export the configured axios instance for advanced usage
export default apiClient;
