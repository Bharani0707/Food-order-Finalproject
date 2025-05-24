
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: 'https://food-order-finalproject-serverside.onrender.com'
  }
};

const currentEnv = process.env.NODE_ENV || 'development'; // fallback if undefined
const currentConfig = config[currentEnv];

export default currentConfig;
