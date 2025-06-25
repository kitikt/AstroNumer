// Utility để debug API endpoint
export const checkApiEndpoint = async () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const endpoint = '/api/Feedback';

  console.log('🔍 Checking API endpoint...');
  console.log('Base URL:', baseURL);
  console.log('Endpoint:', endpoint);

  try {
    const response = await fetch(`${baseURL}${endpoint}`);
    
    console.log(`✅ ${endpoint}: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log(`🎯 API endpoint working!`);
      return true;
    } else {
      console.log(`❌ API endpoint returned ${response.status}`);
      return false;
    }
  } catch {
    console.log(`❌ Failed to connect to API`);
    return false;
  }
};

// Kiểm tra khi development
if (import.meta.env.DEV) {
  setTimeout(() => {
    checkApiEndpoint();
  }, 1000);
} 