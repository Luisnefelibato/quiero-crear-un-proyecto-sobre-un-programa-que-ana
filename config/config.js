const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/marketing_trends',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    },
  },
  analytics: {
    apiKey: process.env.ANALYTICS_API_KEY || 'your_analytics_api_key_here',
    endpoint: process.env.ANALYTICS_ENDPOINT || 'https://api.analytics.com/v1',
  },
  contentGenerator: {
    model: process.env.CONTENT_GENERATOR_MODEL || 'gpt-3.5-turbo',
    apiKey: process.env.CONTENT_GENERATOR_API_KEY || 'your_content_generator_api_key_here',
  },
};