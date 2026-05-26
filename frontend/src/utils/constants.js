/**
 * Application Constants
 * 
 * Centralized configuration for file uploads, API endpoints, and application settings
 */

// =========================
// FILE UPLOAD CONSTANTS
// =========================

/**
 * Accepted image file formats for upload
 * @type {string[]}
 */
export const ACCEPTED_FILE_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

/**
 * Accepted file extensions for display
 * @type {string}
 */
export const ACCEPTED_FILE_EXTENSIONS = 'JPEG, PNG, JPG';

/**
 * Maximum file size in megabytes
 * @type {number}
 */
export const MAX_FILE_SIZE_MB = 10;

/**
 * Maximum file size in bytes
 * @type {number}
 */
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// =========================
// API ENDPOINTS
// =========================

/**
 * Base URL for the backend API
 * Falls back to localhost if environment variable is not set
 * @type {string}
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * API endpoint for coffee bean prediction
 * @type {string}
 */
export const PREDICT_ENDPOINT = '/predict';

/**
 * Full prediction API URL
 * @type {string}
 */
export const PREDICT_API_URL = `${API_BASE_URL}${PREDICT_ENDPOINT}`;

// =========================
// UI CONSTANTS
// =========================

/**
 * Maximum image preview width in pixels
 * @type {number}
 */
export const MAX_IMAGE_PREVIEW_WIDTH = 400;

/**
 * Toast notification auto-dismiss duration in milliseconds
 * @type {number}
 */
export const TOAST_DURATION = 5000;

/**
 * API request timeout in milliseconds
 * @type {number}
 */
export const API_TIMEOUT = 30000;

// =========================
// CONFIDENCE THRESHOLDS
// =========================

/**
 * Confidence threshold for high confidence (green indicator)
 * @type {number}
 */
export const HIGH_CONFIDENCE_THRESHOLD = 80;

/**
 * Confidence threshold for medium confidence (yellow indicator)
 * @type {number}
 */
export const MEDIUM_CONFIDENCE_THRESHOLD = 50;

// =========================
// ANIMATION CONSTANTS
// =========================

/**
 * Default animation duration in seconds
 * @type {number}
 */
export const DEFAULT_ANIMATION_DURATION = 0.6;

/**
 * Stagger delay between animated children in seconds
 * @type {number}
 */
export const STAGGER_DELAY = 0.2;

/**
 * Spring animation stiffness
 * @type {number}
 */
export const SPRING_STIFFNESS = 100;

/**
 * Spring animation damping
 * @type {number}
 */
export const SPRING_DAMPING = 15;
