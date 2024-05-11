/**
 * @desc  This is the DoctorList component. It is used to display the list of doctors.
 */

// Import the required libraries.
import { BASE_URL } from "../../Utils/config";

// Import the required hooks.
import useFetchData from "./../../hooks/FetchData";

// Import the required components.
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import DoctorCard from "./DoctorCard";

// DoctorList component.
const DoctorList = () => {
  // Fetch the data from the server.
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className=" m-4  md:m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 mt-0 lg:mt-[55px] text-center ">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
