
const config = {
  
  API_BASE_URL: 'https://food-order-finalproject-serverside.onrender.com',  // Default URL for production
  

  development: {
    API_BASE_URL: 'http://localhost:5000' // Local development URL
  },
  production: {
    API_BASE_URL: 'https://food-order-finalproject-serverside.onrender.com'   //for production
  }
};


const currentConfig = process.env.NODE_ENV === 'production' 
  ? config.production 
  : config.development;

export default currentConfig;