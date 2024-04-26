
import React, { useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import MyBooking from "./MyBooking";
import ProfileSetting from "./ProfileSetting";
import useGetProfile from "../../hooks/FetchData";
import { BASE_URL } from "../../Utils/config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error";

const UserAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log("userdata", userData);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error err={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-pinkColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-black font-bold">
                  {userData.name}
                </h3>
                <p className="text-gray-700 text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-[90%] ms-[5%] mt-[-15px] bg-white text-pinkColor border-pinkColor border hover:border-purpleColor hover:text-purpleColor hover:bg-purple-50  p-3 text-[16px] leading-7 rounded-md"
                >
                  Logout
                </button>
                <button className="w-[90%] ms-[5%]  text-red-700  border-red-700 border hover:border-red hover:bg-red-700 hover:text-white mt-4 p-3 text-[16px] leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`${
                    activeTab === "bookings" && "bg-purpleColor text-white "
                  } p-2 mr-5 px-5 rounded-md  font-medium text-[16px] leading-7 border border-solid border-purpleColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`${
                    activeTab === "settings" && " bg-purpleColor text-white"
                  } py-2 px-5 rounded-md font-medium text-[16px] leading-7 border border-solid border-purpleColor`}
                >
                  Profile Settings
                </button>
              </div>

              {activeTab === "bookings" && <MyBooking />}
              {activeTab === "settings" && <ProfileSetting user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAccount;
