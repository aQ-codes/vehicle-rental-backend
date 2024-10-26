import Typesense from 'typesense';
import dotenv from 'dotenv';

dotenv.config(); 
// Initialize the Typesense client
const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: '443',
      protocol: 'https',
    },
  ],
  apiKey: process.env.ADMIN_API_KEY,
  connectionTimeoutSeconds: 2,
});

export default typesenseClient;
