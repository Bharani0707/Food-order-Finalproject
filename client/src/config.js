// src/config.js - இந்த file-ஐ உங்க src folder-ல create பண்ணுங்க
const config = {
  // உங்க Render backend URL-ஐ இங்க போடுங்க
  API_BASE_URL: 'https://food-order-finalproject-serverside.onrender.com',
  
  // வேற environments-க்கு
  development: {
    API_BASE_URL: 'http://localhost:5000' // உங்க local backend port
  },
  production: {
    API_BASE_URL: 'https://food-order-finalproject-serverside.onrender.com'
  }
};

// Environment base-ல config export பண்ணும்
const currentConfig = process.env.NODE_ENV === 'production' 
  ? config.production 
  : config.development;

export default currentConfig;