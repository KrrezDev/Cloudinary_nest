import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
  cloud_name: 'ml_default',
  api_key: 'CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dlbiwr6fv',
  api_secret: 'WHiEI_GrIALDx3TWRiBimpcwwr8',
});

export default cloudinary;