# API Service Layer Documentation

## Overview

The API service layer provides a centralized interface for communicating with the BeanSense backend API. It handles HTTP requests, error handling, response transformation, and timeout management.

## Files

- **api.js** - Main API service module with Axios configuration
- **api.test.js** - Manual test functions for API verification
- **ApiTestComponent.jsx** - React component for manual UI testing (in components/)

## Configuration

### Environment Variables

The API service uses environment variables for configuration:

```env
VITE_API_BASE_URL=http://localhost:5000
```

- **VITE_API_BASE_URL**: Base URL for the backend API (default: http://localhost:5000)

### Axios Configuration

- **Base URL**: Loaded from `VITE_API_BASE_URL` environment variable
- **Timeout**: 30 seconds (30000ms) as per requirement 8.4
- **Headers**: Accepts JSON responses

## API Functions

### `predictBean(file)`

Sends an image file to the backend for coffee bean classification.

**Parameters:**
- `file` (File): Image file to classify (JPEG, PNG, JPG)

**Returns:**
- `Promise<{prediction: string, confidence: number}>`: Prediction result

**Throws:**
- `Error`: Network error, timeout, or API error with user-friendly message

**Example:**
```javascript
import { predictBean } from './services/api';

try {
  const result = await predictBean(imageFile);
  console.log(`Prediction: ${result.prediction}`);
  console.log(`Confidence: ${result.confidence}%`);
} catch (error) {
  console.error('Classification failed:', error.message);
}
```

### `checkServerHealth()`

Checks if the backend server is running and reachable.

**Returns:**
- `Promise<boolean>`: True if server is reachable, false otherwise

**Example:**
```javascript
import { checkServerHealth } from './services/api';

const isHealthy = await checkServerHealth();
if (isHealthy) {
  console.log('Server is running');
} else {
  console.log('Server is not responding');
}
```

## Error Handling

### Error Types

The API service handles three types of errors:

1. **Backend Errors**: Errors returned by the backend API
2. **Network Errors**: Connection failures, server unreachable
3. **Timeout Errors**: Request exceeds 30-second timeout

### Error Message Transformation

The response interceptor automatically transforms Indonesian backend error messages to user-friendly English messages:

| Backend Error (Indonesian) | Transformed Message (English) |
|---------------------------|-------------------------------|
| File tidak ditemukan | No file was uploaded. Please try again. |
| File kosong | The uploaded file is empty. Please select a valid image. |
| Gagal membaca gambar | Failed to read the image. Please upload a different file. |
| Contour tidak ditemukan | No coffee bean detected. Please upload a clearer image with a visible coffee bean. |

### Error Properties

Errors thrown by the API service may include additional properties:

- `error.response`: Original Axios response object (for backend errors)
- `error.originalError`: Original backend error message (before transformation)
- `error.isNetworkError`: Boolean flag for network errors
- `error.isTimeout`: Boolean flag for timeout errors

## Response Interceptor

The API service includes a response interceptor that:

1. **Passes through successful responses** unchanged
2. **Transforms error messages** from Indonesian to English
3. **Categorizes errors** (backend, network, timeout)
4. **Provides user-friendly messages** for all error scenarios

## Backend API Contract

### Endpoint: POST /predict

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'file' field containing the image

**Success Response:**
```json
{
  "prediction": "Arabica",
  "confidence": 95.67
}
```

**Error Response:**
```json
{
  "error": "Contour tidak ditemukan"
}
```

## Testing

### Manual Testing with Test Component

1. Import the ApiTestComponent in your App.jsx:
```javascript
import ApiTestComponent from './components/ApiTestComponent';

function App() {
  return (
    <div>
      <ApiTestComponent />
      {/* Your other components */}
    </div>
  );
}
```

2. Start the backend server:
```bash
cd backend
python app.py
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

4. Open the browser and use the test component to:
   - Check server health
   - Upload a coffee bean image
   - Test the prediction functionality
   - Verify error handling

### Manual Testing with Console

You can also test the API service directly in the browser console:

```javascript
import { runAllTests } from './services/api.test.js';

// Run all tests (without image file)
await runAllTests();

// Run all tests with an image file
const fileInput = document.querySelector('input[type="file"]');
const imageFile = fileInput.files[0];
await runAllTests(imageFile);
```

## Requirements Validation

This implementation satisfies all requirements from the design document:

- ✅ **8.1**: API service file created in services/ directory
- ✅ **8.2**: Axios configured with backend base URL from environment variables
- ✅ **8.3**: predictBean function implemented with FormData and POST to /predict
- ✅ **8.4**: Request timeout configured to 30 seconds
- ✅ **8.5**: FormData created with image file
- ✅ **8.6**: POST request sent to /predict endpoint
- ✅ **8.7**: Promise returned resolving to API response
- ✅ **8.8**: Error handling for network failures, timeout, and API errors
- ✅ **Bonus**: Response interceptor transforms backend error messages

## Integration with Components

The API service is designed to be used with custom hooks:

```javascript
// Example: usePrediction hook
import { useState } from 'react';
import { predictBean } from '../services/api';

const usePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const predict = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictBean(file);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setResult(null);
    setError(null);
  };

  return { isLoading, result, error, predict, reset };
};

export default usePrediction;
```

## Troubleshooting

### Common Issues

1. **"Unable to connect to server"**
   - Ensure the backend server is running on http://localhost:5000
   - Check if the VITE_API_BASE_URL environment variable is correct
   - Verify CORS is enabled on the backend

2. **"Request timed out"**
   - Check your network connection
   - Ensure the backend server is responding
   - The image processing may be taking longer than 30 seconds (rare)

3. **"No coffee bean detected"**
   - Upload a clearer image with a visible coffee bean
   - Ensure the image has good contrast and lighting
   - Try a different image

## Future Enhancements

Possible improvements for the API service:

1. **Request Cancellation**: Add ability to cancel in-flight requests
2. **Retry Logic**: Automatically retry failed requests
3. **Request Caching**: Cache prediction results for identical images
4. **Progress Tracking**: Track upload progress for large images
5. **Batch Predictions**: Support multiple image uploads
6. **Authentication**: Add JWT token support for authenticated requests
