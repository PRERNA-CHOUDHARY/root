/**
 * @description: This file defines the DoctorCard component which is used to display the details of a doctor in the doctor list.
 */

// Import necessary libraries.
import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

// Import the star icon.
import starIcon from "../../assets/images/Star.png";

// Define the DoctorCard component.
const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <div className="p-0 lg:p-1">
      <div className="items-center ">
        <img
          src={photo}
          className="w-[70%] items-center ms-9 md:ms-12"
          alt=""
        />
      </div>
      <h2 className="text-[16px] leading-[30px] lg:text-[26px] lg:leading-5 text-headingColor mt-3 lg:mt-5  items-start">
        {name}
      </h2>
      <div className="mt-2 lg:mt-4 w-[80%] flex items-center justify-between">
        <span className="bg-pink-200 ms-9 md:ms-12 text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] rounded-md lg:leading-7">
          {specialization}
        </span>
        <div className="flex items-center gap-[2px] ">
          <span className="flex items-center gap-[5px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="" />
            {avgRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            {" "}
            ({totalRating})
          </span>
        </div>
      </div>
      <div className="mt-[18px] lg:mt-5 flex items-start justify-between ">
        <div>
          <p className="text-[14px] ms-9 md:ms-12 leading-7 font-[400] text-textColor  ">
            At {experiences && experiences[0]?.hospital}
          </p>
        </div>
        {console.log(`${doctor._id}`)}
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[22px] h-[22px]  rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-5 h-3" />
        </Link>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default DoctorCard;
