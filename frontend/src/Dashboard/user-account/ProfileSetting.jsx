/**
 * @desc   This file contain the ProfileSetting component. This component is used to update the user profile.
 */

// Import the necessary modules.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import PropTypes from "prop-types";

// Import the utility functions.
import uploadImageToCloudinary from "../../Utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../Utils/config.js";

// Define the ProfileSetting component.
const ProfileSetting = ({ user }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Define the state variables.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  // Define the navigate function.
  const navigate = useNavigate();

  // Define the useEffect hook.
  useEffect(() => {
    // Set the form data.
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  // Define the handleInput function.
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Define the handleFile function.
  const handleFile = async (event) => {
    // Get the file from the event.
    const file = event.target.files[0];

    // Upload the image to cloudinary.
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  // Define the submitHandler function.
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Fetch the data from the server.
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      // Check if the response is not ok and throw an error.
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={formData.name}
            onChange={handleInput}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-700 text-[16px] leading-7 text-black placeholder:text-gray-600  cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-700 text-[16px] leading-7 text-black placeholder:text-gray-600  cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-700 text-[16px] leading-7 text-black placeholder:text-gray-600  cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInput}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-700 text-[16px] leading-7 text-black placeholder:text-gray-600  cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-black font-bold text-[16px] leading-7">
            What&apos;s your gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInput}
              className="text-gray-700 font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="cannot">Can&apos;t say</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purpleColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full "
              />
            </figure>
          )}
          <div className="relative w-[185px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFile}
              accept=".jpg, .jpeg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#8c00ff46] text-black font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Profile Picture
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full btn text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            type="submit"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

ProfileSetting.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileSetting;
