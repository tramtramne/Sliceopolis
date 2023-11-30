const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadFile = async (filePath, fileExtention = ['png', 'jpg', 'gif', 'jpeg', 'webp']) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    uploadFile,
};
