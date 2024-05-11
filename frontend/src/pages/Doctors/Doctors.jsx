import React, { useEffect } from "react";
import DoctorCard from "./../../components/Doctors/DoctorCard";
// import { doctors } from "./../../assets/data/doctors";
import useFetchData from "./../../hooks/FetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../Utils/config";
import { useState } from "react";
const Doctors = () => {
  // const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const handleSearch = () => {
    setQuery(query.trim())
    // {console.log(query)}
    // console.log("handle Search");
    // console.log(useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`))
  };
  useEffect(() => {
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
      {/* {console.log(`yooo +${doctors}`)}; */}
      <section className="bg-fuchsia-100 mb-0 h-[10%] ">
        <div className="container md:mt-[-3rem] text-center ">
          <h2 className="heading"> Meet a Theripist </h2>
          <div className="max-w-[570px] mb-0 mt-0 mx-auto border border-primaryColor bg-white rounded-md flex items-center justify-between ">
            <input
              type="search"
              className="py-0  pl-4 pr-2 bg-white-50 w-full focus:outline-none   rounded-md cursor-pointer placeholder:text-pink-300  text-pink-600"
              placeholder="Find Theripist"
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
