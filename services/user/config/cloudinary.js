const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const verifyCloudinary = async () => {
  try {
    await cloudinary.api.ping();
    return true;
  } catch (error) {
    console.error("Cloudinary Configuration Error:", error.message);
    return false;
  }
};

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'HireHeaven/Profiles',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] 
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'HireHeaven/Resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'docx'],
  },
});

const uploadFromBuffer = (buffer, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { 
  cloudinary, 
  profileUpload: profileStorage, 
  resumeUpload: resumeStorage,
  verifyCloudinary,
  uploadFromBuffer
};