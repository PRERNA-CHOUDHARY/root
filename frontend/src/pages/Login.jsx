import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/config.js"
import { toast } from "react-toastify";
// import { authContext } from "../Context/AuthContext";
import { AuthContext } from "../Context/AuthContext.jsx"
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user, token, role, dispatch } = useContext(AuthContext);
  console.log('Context Value:', { user, token, role, dispatch });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user:result.data,
          token:result.token,
          role:result.role,
        }
      })
      console.log(result, 'login data')

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className=" w-full max-w-[570px] mx-auto rounded-lg shadow-lg md:p-10 border border-solid border-fuchsia-50">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ms-5">
          Namaste !!{" "}
          <span className="text-primaryColor"> Welcome to MedicWise :) </span>
        </h3>
        <form action="" className="py-4 md:py-0" onSubmit={submitHandler} >
          <div className="mb-5">
            <span className="mx-5 me-14 text-textColor">Email:</span>
            <input
              type="email"
              placeholder="JohnDoe@yahoo.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className=" w-[70%] px-4 py-2  border-b border-solid border-fuchsia-300  focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7  placeholder:text-pink-200 cursor-pointer rounded-md"
            />
          </div>
          <div className="mb-5">
            <span className="mx-5  text-textColor">Password:</span>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className=" w-[70%] px-4 py-2 border-b border-solid border-fuchsia-300  focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7  placeholder:text-pink-200 cursor-pointer rounded-md"
            />
          </div>

          <div className="mt-7 items-center flex justify-center align-middle">
            <button
              type="submit"
              className=" w-[80%] btn text-[18px] text-white leading-8 rounded-md px-4 py-1"
            >
              {loading ? <HashLoader className="px-[11rem]" size={25} color="#ffffff"/> : 'Login'}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center text-[15px]">
            Don't have an account?<Link to='/register' className="text-irisBlueColor"> Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
