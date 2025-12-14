import { v2 as cloudinary } from "cloudinary";
// Use this import style for dotenv to ensure it runs before anything else
import "dotenv/config";

// --- DEBUGGING START ---
// If these are still false, the upload will fail entirely.
// If they are true, you can remove this block.
console.log("--- CLOUDINARY DEBUG ---");
console.log("Cloud Name exists:", !!process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);
// --- DEBUGGING END ---

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// This function holds the logic for the destination folder
export const uploadImage = async (filePath, folder = "webtalk_dev") => {
  try {
    // Ensure folder exists or is created
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: "image",
    });
    console.log(`Successfully uploaded to folder [${folder}]:`, result.secure_url);
    return result;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    // Important: Throw the error so the controller knows it failed
    throw err;
  }
};

// Default export the configured instance
export default cloudinary;