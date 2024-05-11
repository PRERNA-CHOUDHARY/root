/**
 * @description: This file exports a function that uploads an image to Cloudinary.
 */

// Get the upload preset and cloud name from the .env file.
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

// Function to upload image to Cloudinary.
const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  // Append the file, upload preset and cloud name to the FormData.
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  // Make a POST request to the Cloudinary API.
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );

  // Return the response as JSON.
  const data = await res.json();
  return data;
};
export default uploadImageToCloudinary;
