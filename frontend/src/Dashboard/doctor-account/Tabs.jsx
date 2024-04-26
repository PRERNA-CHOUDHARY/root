import React, {useContext} from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/home')
  };
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => {
            setTab('overview')
          }}
          className={`${
            tab == "overview"
              ? "bg-fuchsia-50 text-pinkColor "
              : "bg-transparent text-headingColor"
          } w-full btn__new mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            setTab('appointments')
          }}
          className={`${
            tab == "appointments"
              ? "bg-fuchsia-50 text-pinkColor "
              : "bg-transparent text-headingColor"
          } w-full btn__new mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => {
            setTab('settings')
          }}
          className={`${
            tab == "settings"
              ? "bg-fuchsia-50 text-pinkColor "
              : "bg-transparent text-headingColor"
          } w-full btn__new mt-0 rounded-md`}
        >
          Edit Profile
        </button>
        <div className="mt-[100px] w-full">
                <button
                  onClick={handleLogout}
                  className="w-[90%] ms-[5%] mt-[-15px] bg-white text-pinkColor border-pinkColor border hover:border-purpleColor hover:text-purpleColor hover:bg-purple-50  p-3 text-[16px] leading-7 rounded-md"
                >
                  Logout
                </button>
                <button className="w-[90%] ms-[5%] text-red-700  border-red-700 border hover:border-red hover:bg-red-700 hover:text-white mt-4 p-3 text-[16px] leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
      </div>
    </div>
  );
};

export default Tabs;
