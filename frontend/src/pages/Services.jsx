/**
 * @file Services page displays the services provided by the hospital.
 */

// Importing Component.
import ServiceCard from "../components/Services/ServiceCard";

// Importing data.
import { services } from "../assets/data/services";

// Service component.
const Services = () => {
  return (
    <div className=" m-4  md:m-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 mt-[30px] lg:mt-[55px] text-center ">
      {services.map((item, index) => (
        <ServiceCard item={item} key={index} />
      ))}
    </div>
  );
};

export default Services;
