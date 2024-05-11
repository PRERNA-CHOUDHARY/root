/**
 * @file Footer.jsx is the footer component for the website.
 */

// Import necessary libraries.
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

// Import the logo image.
import logo from "../../assets/images/logo192.png";

// Set the social links.
const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: (
      <AiFillYoutube className="group-hover:text-fuchsia-900 w-4 h-5 text-white" />
    ),
  },
  {
    path: "https://www.github.com",
    icon: (
      <AiFillGithub className="group-hover:text-fuchsia-900 w-4 h-5 text-white" />
    ),
  },
  {
    path: "https://www.instagram.com",
    icon: (
      <AiOutlineInstagram className="group-hover:text-fuchsia-900 text-white w-4 h-5" />
    ),
  },
  {
    path: "https://www.linkedin.com",
    icon: (
      <RiLinkedinFill className="group-hover:text-fuchsia-900 w-4 h-5 text-white" />
    ),
  },
];

// Set the quick links.
const quickLinks2 = [
  {
    path: "/contact",
    display: "Contact Us",
  },
  {
    path: "/",
    display: "Donate",
  },
];

// Set the quick links.
const quickLinks1 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/doctors",
    display: "Set Appointment",
  },
];

// Export the Footer component.
export const Footer = () => {
  // Get the current year.
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10 bg-fuchsia-900 mt-5">
      <div className="container">
        <div className="flex justify-between  md:flex-row flex-wrap gap-[30px] md:gap-0 md:mx-10">
          <div>
            <img src={logo} alt="" />
            <p className="text-[13px] leading-7 text-gray-300 mt-4">
              Copyright &copy; {year} developed by MedicWise all rights reserved{" "}
            </p>
            <div className="flex items-center gap-3 mt-4 ">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-gray-300 rounded-full flex item-center pt-2 justify-center group hover:bg-white hover:border-none "
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[600] mb-6 text-gray-300 ">
              Quick Links
            </h2>
            <ul>
              {quickLinks1.map((item, index) => (
                <li key={index} className="mb-4 ">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7  font-[400] text-gray-400 "
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-gray-300 ">
              Want to
            </h2>
            <ul>
              {quickLinks2.map((item, index) => (
                <li key={index} className="mb-4 ">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7  font-[400] text-gray-400 "
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
