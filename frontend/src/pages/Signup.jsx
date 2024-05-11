/**
 * @file Signup.jsx is the signup page for the application.
 */

// Import the modules.
import { useState } from "react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

// Import the image.
import signupImg from "../assets/images/signup.png";

// Import the utility function.
import uploadImageToCloudinary from "../Utils/uploadCloudinary";
import { BASE_URL } from "../Utils/config";

// Define the Signup component.
const Signup = () => {
  // Define the state variables.
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  // Define the navigate function.
  const navigate = useNavigate();

  // Define the event handlers.
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Define the function to handle file input change.
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    // Upload the image to Cloudinary.
    const data = await uploadImageToCloudinary(file);

    // Set the preview URL and the selected file.
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  // Define the function to handle form submission.
  const submitHandler = async (event) => {
    // Prevent the default form submission.
    event.preventDefault();
    setLoading(true);
    try {
      // Make a POST request to the server.
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      // If the response is not okay, throw an error.
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);

      // Redirect to the login page.
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0 py-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block rounded-l-lg">
            <figure className="rounded-l-lg flex justify-center items-center">
              <img src={signupImg} alt="" className=" rounded-l-lg" />
            </figure>
          </div>
          <div className="md:mx-7 py-7 lg:pl-6  rounded-lg shadow-lg  border border-solid border-fuchsia-50">
            <h3 className="mx-2 text-headingColor text-[22px] leading-7 font-bold mb-6 ">
              Create an <span className="text-primaryColor "> account</span>
            </h3>
            <form action="" onSubmit={submitHandler}>
              <div className="mb-1">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="ms-5 mt-4 w-[90%] px-4 py-2 border-b border-solid border-fuchsia-300  focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7  placeholder:text-pink-200 cursor-pointer rounded-md required"
                />
              </div>
              <div className="mb-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="ms-5 mt-4 w-[90%] px-4   py-2 border-b border-solid border-fuchsia-300  focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7  placeholder:text-pink-200 cursor-pointer rounded-md required"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Create password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="ms-5 mt-4 w-[90%] px-4 py-2 border-b border-solid border-fuchsia-300  focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7  placeholder:text-pink-200 cursor-pointer rounded-md required"
                />
              </div>
              <div className="mb-3 flex items-center jujstify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16px] leading-7 mx-6 "
                >
                  I am a:
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className=" text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none "
                  >
                    <option value="patient"> User</option>
                    <option value="doctor"> Therapist</option>
                  </select>
                </label>
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16px] leading-7 mx-6 "
                >
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    id="gender"
                    className=" text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none "
                  >
                    <option value="">--Select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </label>
              </div>
              <div className="mb-5  ms-4 flex items-center gap-3">
                {selectedFile && (
                  <figure
                    className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center
                 "
                  >
                    <img
                      src={previewURL}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[160px] h-[50px] ">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0  left-0 w-full h-full flex items-center px-[1.2rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-pink-100 text-headingColor font-semibold rounded-lg truncate cursor-pointer "
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="mt-7 items-center flex justify-center">
                <button
                  disabled={loading && true}
                  type="submit"
                  className=" w-[80%] bg-primaryColor text-[18px] text-white leading-8 hover:bg-irisBlueColor text-center  rounded-md px-4 py-1"
                >
                  {loading ? (
                    <HashLoader
                      color="white"
                      size={35}
                      className="text-center m-auto"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <p className="mt-3 mb-4 text-textColor text-center text-[15px]">
                Already have an account?
                <Link to="/login" className="text-irisBlueColor">
                  {" "}
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
