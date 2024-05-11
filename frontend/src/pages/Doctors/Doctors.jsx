/**
 * @description: Doctors page component for the application.
 */

// Importing the necessary modules.
import { useEffect, useState } from "react";

// Importing the custom hooks.
import useFetchData from "./../../hooks/FetchData";

// Importing the components.
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

// Importing the utility functions.
import { BASE_URL } from "../../Utils/config";

// Defining the Doctors functional component.
const Doctors = () => {
  // Defining the state variables.
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  // Defining the function to handle the search.
  const handleSearch = () => {
    setQuery(query.trim());
  };

  // Fetching the data from the server.
  useEffect(() => {
    // Defining the timeout function.
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  return (
    <>
      <section className="bg-fuchsia-100 mb-0 h-[10%] ">
        <div className="container md:mt-[-3rem] text-center ">
          <h2 className="heading"> Meet a Therapist </h2>
          <div className="max-w-[570px] mb-0 mt-0 mx-auto border border-primaryColor bg-white rounded-md flex items-center justify-between ">
            <input
              type="search"
              className="py-0  pl-4 pr-2 bg-white-50 w-full focus:outline-none   rounded-md cursor-pointer placeholder:text-pink-300  text-pink-600"
              placeholder="Find Therapist"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 mb-0 rounded-[0px] rounded-r-md "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="container">
            <div className=" m-0  md:m-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 mt-0 lg:mt-0 text-center ">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Doctors;
