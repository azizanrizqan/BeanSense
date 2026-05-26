/**
 * Manual Test File for API Service
 * 
 * This file provides manual test functions to verify the API service
 * functionality. Run these tests in the browser console or create a
 * test component to execute them.
 */

import { predictBean, checkServerHealth } from './api.js';

/**
 * Test 1: Check server health
 */
export const testServerHealth = async () => {
  console.log('Test 1: Checking server health...');
  try {
    const isHealthy = await checkServerHealth();
    console.log('✓ Server health check:', isHealthy ? 'PASSED' : 'FAILED');
    return isHealthy;
  } catch (error) {
    console.error('✗ Server health check failed:', error.message);
    return false;
  }
};

/**
 * Test 2: Test predictBean with valid image
 * Note: This requires a valid image file to be passed
 */
export const testPredictBeanWithValidImage = async (imageFile) => {
  console.log('Test 2: Testing predictBean with valid image...');
  try {
    const result = await predictBean(imageFile);
    console.log('✓ Prediction successful:', result);
    console.log('  - Prediction:', result.prediction);
    console.log('  - Confidence:', result.confidence + '%');
    return true;
  } catch (error) {
    console.error('✗ Prediction failed:', error.message);
    return false;
  }
};

/**
 * Test 3: Test predictBean with null file
 */
export const testPredictBeanWithNullFile = async () => {
  console.log('Test 3: Testing predictBean with null file...');
  try {
    await predictBean(null);
    console.error('✗ Should have thrown an error for null file');
    return false;
  } catch (error) {
    console.log('✓ Correctly threw error:', error.message);
    return true;
  }
};

/**
 * Test 4: Test predictBean with invalid file object
 */
export const testPredictBeanWithInvalidFile = async () => {
  console.log('Test 4: Testing predictBean with invalid file object...');
  try {
    await predictBean({ not: 'a file' });
    console.error('✗ Should have thrown an error for invalid file');
    return false;
  } catch (error) {
    console.log('✓ Correctly threw error:', error.message);
    return true;
  }
};

/**
 * Test 5: Test error message transformation
 * This test simulates backend error responses
 */
export const testErrorMessageTransformation = () => {
  console.log('Test 5: Testing error message transformation...');
  
  const errorMap = {
    'File tidak ditemukan': 'No file was uploaded. Please try again.',
    'File kosong': 'The uploaded file is empty. Please select a valid image.',
    'Gagal membaca gambar': 'Failed to read the image. Please upload a different file.',
    'Contour tidak ditemukan': 'No coffee bean detected. Please upload a clearer image with a visible coffee bean.'
  };
  
  console.log('✓ Error message mappings configured:');
  Object.entries(errorMap).forEach(([indonesian, english]) => {
    console.log(`  - "${indonesian}" → "${english}"`);
  });
  
  return true;
};

/**
 * Run all tests
 */
export const runAllTests = async (imageFile = null) => {
  console.log('='.repeat(60));
  console.log('Running API Service Tests');
  console.log('='.repeat(60));
  
  const results = [];
  
  // Test 1: Server health
  results.push(await testServerHealth());
  console.log('');
  
  // Test 2: Valid image (only if provided)
  if (imageFile) {
    results.push(await testPredictBeanWithValidImage(imageFile));
    console.log('');
  } else {
    console.log('Test 2: Skipped (no image file provided)');
    console.log('');
  }
  
  // Test 3: Null file
  results.push(await testPredictBeanWithNullFile());
  console.log('');
  
  // Test 4: Invalid file
  results.push(await testPredictBeanWithInvalidFile());
  console.log('');
  
  // Test 5: Error transformation
  results.push(testErrorMessageTransformation());
  console.log('');
  
  // Summary
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('='.repeat(60));
  console.log(`Test Results: ${passed}/${total} passed`);
  console.log('='.repeat(60));
  
  return passed === total;
};

// Export for use in browser console or test component
export default {
  testServerHealth,
  testPredictBeanWithValidImage,
  testPredictBeanWithNullFile,
  testPredictBeanWithInvalidFile,
  testErrorMessageTransformation,
  runAllTests
};
