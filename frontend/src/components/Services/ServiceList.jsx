/**
 * @desc  This is the Services List Component. This component is used to display the services list on the home page.
 */

// Import the required dependencies.
import { Link } from "react-router-dom";

// Importing the services data.
import { services } from "./../../assets/data/services";

// ServiceList Component.
const ServiceList = () => {
  return (
    <>
      <div className="m-4  md:m-7 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-24 mt-[30px] lg:mt-[55px] text-center ">
        <div className="py-[30px] px-3 lg:px-5 bg-fuchsia-50 rounded-md">
          <h2 className="text-[26px]  leading-9 text-headingColor font-[700] ">
            {services[1].name}
          </h2>
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
            {services[1].desc}
          </p>
        </div>
        <div className="py-[30px] px-3 lg:px-5 bg-fuchsia-50 rounded-md">
          <h2 className="text-[26px]  leading-9 text-headingColor font-[700] ">
            {services[5].name}
          </h2>
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
            {services[5].desc}
          </p>
        </div>
        <div className="py-[30px] px-3 lg:px-5 bg-fuchsia-50 rounded-md">
          <h2 className="text-[26px]  leading-9 text-headingColor font-[700] ">
            {services[3].name}
          </h2>
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
            {services[3].desc}
          </p>
        </div>
        <div className="py-[30px] px-3 lg:px-5 bg-fuchsia-50 rounded-md">
          <h2 className="text-[26px]  leading-9 text-headingColor font-[700] ">
            {services[2].name}
          </h2>
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
            {services[2].desc}
          </p>
        </div>
      </div>
      <Link to="/services" className="ms-[40%] md:ms-[50%] lg:ms-[45%]">
        <button className="btn">Explore More..</button>
      </Link>
    </>
  );
};

export default ServiceList;
