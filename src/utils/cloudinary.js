import "dotenv/config";
import cloudinary from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_url: process.env.CLOUDINARY_URL,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export { cloudinary };