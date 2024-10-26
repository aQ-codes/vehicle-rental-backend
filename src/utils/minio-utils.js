import { Client } from 'minio';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config(); 

// Configure the MinIO client
const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10) || 9000, // default MinIO port
    useSSL: process.env.MINIO_USE_SSL === 'true', // true or false depending on your setup
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

// Ensure the bucket exists (create if not)
const ensureBucketExists = async () => {
    try {
        // Check if the bucket exists
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            // If the bucket does not exist, create it
            await minioClient.makeBucket(BUCKET_NAME);
            console.log(`Bucket '${BUCKET_NAME}' created successfully.`);
        } else {
            console.log(`Bucket '${BUCKET_NAME}' already exists.`);
        }
    } catch (err) {
        // Handle any errors that occur
        console.error('Error checking or creating bucket:', err);
        throw err; // Re-throw the error after logging it
    }
};

// Call this function once when your application starts
ensureBucketExists();

export const uploadFileToMinio = async (file) => {
    const { createReadStream, filename, mimetype } = await file;

    const key = `vehicles/${uuidv4()}-${filename}`;
    
    // Upload the file to MinIO
    await minioClient.putObject(BUCKET_NAME, key, createReadStream(), {
        'Content-Type': mimetype,
        'x-amz-acl': 'public-read' // Make the image public
    });

    // Construct the public URL
    const location = `/${BUCKET_NAME}/${key}`;
    
    return location; // Return the public URL of the uploaded file
};
