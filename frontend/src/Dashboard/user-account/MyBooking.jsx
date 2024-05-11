/**
 * @file MyBooking component. It is used to show the appointments booked by the user.
 */

// Import the hooks.
import FetchData from "../../hooks/FetchData";

// Import the config.
import { BASE_URL } from "../../Utils/config.js";

// Import the DoctorCard component.
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

// Define the MyBooking component.
const MyBooking = () => {
  // Fetch the appointments data from the server.
  const {
    data: appointments,
    loading,
    error,
  } = FetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error err={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-pink-700">
          You did not booked any appointments yet!!
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
