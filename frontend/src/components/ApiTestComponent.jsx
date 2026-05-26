/**
 * API Test Component
 * 
 * This component provides a simple UI to manually test the API service.
 * It can be temporarily added to the app for testing purposes.
 */

import { useState } from 'react';
import { predictBean, checkServerHealth } from '../services/api';

const ApiTestComponent = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Test server health
  const handleCheckHealth = async () => {
    setServerStatus('checking...');
    try {
      const isHealthy = await checkServerHealth();
      setServerStatus(isHealthy ? '✓ Server is running' : '✗ Server is not responding');
    } catch (err) {
      setServerStatus('✗ Error checking server');
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  // Test prediction
  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictBean(selectedFile);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '20px auto',
      border: '2px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ marginBottom: '20px' }}>API Service Test Component</h2>
      
      {/* Server Health Check */}
      <div style={{ marginBottom: '20px' }}>
        <h3>1. Server Health Check</h3>
        <button 
          onClick={handleCheckHealth}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check Server Health
        </button>
        {serverStatus && (
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
            {serverStatus}
          </p>
        )}
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* Prediction Test */}
      <div>
        <h3>2. Test Prediction</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="file" 
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
          {selectedFile && (
            <p style={{ fontSize: '14px', color: '#666' }}>
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
        
        <button 
          onClick={handlePredict}
          disabled={!selectedFile || isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedFile && !isLoading ? '#2196F3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedFile && !isLoading ? 'pointer' : 'not-allowed'
          }}
        >
          {isLoading ? 'Classifying...' : 'Classify Bean'}
        </button>

        {/* Results */}
        {result && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
            border: '1px solid #4CAF50'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>✓ Success!</h4>
            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Confidence:</strong> {result.confidence}%</p>
          </div>
        )}

        {/* Errors */}
        {error && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#ffebee',
            borderRadius: '4px',
            border: '1px solid #f44336'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#c62828' }}>✗ Error</h4>
            <p>{error}</p>
          </div>
        )}
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* Instructions */}
      <div style={{ fontSize: '14px', color: '#666' }}>
        <h4>Test Instructions:</h4>
        <ol>
          <li>First, check if the backend server is running</li>
          <li>Select a coffee bean image (JPEG, PNG, or JPG)</li>
          <li>Click "Classify Bean" to test the prediction</li>
          <li>Verify the result or error message appears correctly</li>
        </ol>
        <p><strong>Note:</strong> Make sure the backend server is running on http://localhost:5000</p>
      </div>
    </div>
  );
};

export default ApiTestComponent;
