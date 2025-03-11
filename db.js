const { Client } = require('pg');
require('dotenv').config();

// Connect to CockroachDB using environment variables for security
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Store in .env
  ssl: {
    rejectUnauthorized: false,  // Needed for cloud-hosted databases
  },
});

client.connect()
  .then(() => console.log('Connected to CockroachDB'))
  .catch(err => console.error('Connection error:', err));

module.exports = client;