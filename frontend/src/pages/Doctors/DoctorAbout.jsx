/**
 * @file DoctorAbout.jsx. The DoctorAbout component displays the about section of the doctor.
 */

// Import the necessary modules.
import PropTypes from "prop-types";

// Import the utility functions.
import { formatDate } from "../../Utils/formatDate";

// Define the DoctorAbout component.
const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <>
      <div>
        <h3 className=" text-[20px] leading-[30px] text-headingColor font-[400] flex items-center gap-2 ">
          {" "}
          About
          <span className="text-irisBlueColor font-[600]">
            Therapist {name}
          </span>
        </h3>
        <p className="text__para__small font-[600]">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-[400] ">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 "
            >
              <div className="text-irisBlueColor text-[15px] leading-6 font-[400]">
                {" "}
                {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                <p className=" text-[16px]  leading-6 font-medium text-textColor ">
                  {item.degree}
                </p>
              </div>
              <p className=" text-[14px]  leading-6 me-10 font-medium text-textColor ">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-[400] ">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => (
            <li key={index} className=" p-4 rounded bg-pink-200 ">
              <span className="text-purpleColor text-[15px] leading-6 font-[400] ">
                {" "}
                {formatDate(item.startingDate)}- {formatDate(item.endingDate)}
              </span>
              <p className=" text-[17px]  leading-6 font-medium   ">
                {item.position}
              </p>
              <p className=" text-[14px]  leading-2 font-medium  ">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

DoctorAbout.propTypes = {
  name: PropTypes.string,
  about: PropTypes.string,
  qualifications: PropTypes.array,
  experiences: PropTypes.array,
};

export default DoctorAbout;
