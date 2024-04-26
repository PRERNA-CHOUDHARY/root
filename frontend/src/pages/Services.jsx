import React from "react";
import ServiceCard from "../components/Services/ServiceCard";
import { services } from "../assets/data/services";
const Services = () => {
  return (
    <div className=" m-4  md:m-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 mt-[30px] lg:mt-[55px] text-center ">
      {services.map((item, index) => (
          <ServiceCard item={item} index={index} />
        ))}
    </div>
  );
};

export default Services;
