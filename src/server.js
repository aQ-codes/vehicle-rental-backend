import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';

// Custom imports
import { typeDefs, resolvers } from './graphql/index.js';
import { initializeTypesenseIndexes } from './typesense/indexes.js';

const app = express();
const PORT = 8080;

// Middleware for file upload and JSON parsing
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(cors());
app.use(express.json());

// Initialize Apollo Server
const startApolloServer = async () => {
  try {
    // Initialize Typesense indices before starting the Apollo Server
    await initializeTypesenseIndexes();
    console.log('Typesense indices initialized');

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      uploads: false, // Disable built-in upload handling as we're using middleware
      formatError: (err) => {
        console.error('Error:', err);
        return err; // Handle errors globally
      },
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      cors: {
        origin: '*', // Allow requests from any origin
      },
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`GraphQL endpoint available at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startApolloServer();
