/**
 * @fileoverview ServiceCard component. This component is used to display the services card on the home page.
 */

// Import the required modules.
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

// Define the ServiceCard component.
const ServiceCard = ({ item, index }) => {
  // Destructure the item object.
  const { name, desc, bgColor } = item;
  return (
    <div className="py-[30px] px-3 lg:px-5 bg-fuchsia-50 rounded-md">
      <h2 className="text-[26px]  leading-9 text-headingColor font-[700] ">
        {name}
      </h2>
      <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
        {desc}
      </p>
      <div className="flex items-center justify-between mt-[30px]">
        <Link
          to="/doctors"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
        <span
          className="w-10 h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
          style={{ background: `${bgColor}`, borderRadius: "6px 0 0 6px" }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
