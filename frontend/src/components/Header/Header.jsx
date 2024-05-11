/**
 * @fileoverview Header component. This component is used to display the header of the website.
 */

// Import the required modules.
import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { BiMenu } from "react-icons/bi";

// Import the logo image.
import logo from "../../assets/images/logo192.png";

// Define the Header component.
import { AuthContext } from "../../Context/AuthContext";

// Define the navigation links.
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/Services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

// Export the Header component.
export const Header = () => {
  // Define the references.
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Define the sticky header function.
  const { user, role, token } = useContext(AuthContext);

  // Define the sticky header function.
  const handleStickyHeader = () => {
    // Add the sticky header class when the user scrolls.
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  // Call the sticky header function.
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  // Define the toggle menu function.
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center " ref={headerRef}>
      <div className="container ">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-irisBlueColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <h2>HI , {user?.name.toUpperCase()}</h2>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor hover:bg-pinkColor py-2 px-6 text-white font-[500] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
