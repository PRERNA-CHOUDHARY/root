/**
 * @description: This file defines the doctor details page component.
 */

// Importing the necessary modules.
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Importing the components.
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

// Importing the images.
import starIcon from "../../assets/images/Star.png";

// Importing the utility functions.
import { BASE_URL, token } from "../../Utils/config";

// Importing the custom hooks.
import useFetchData from "./../../hooks/FetchData";

// Defining the DoctorDetails functional component.
const DoctorDetails = () => {
  // Defining the state variables.
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const [timeSlotsFetched, setTimeSlotsFetched] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [communicationMode, setCommunicationMode] = useState("");

  // Fetching the data from the server.
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    qualifications,
    experiences,
    timeSlots,
    photo,
    reviews,
  } = doctor;

  // Fetching the time slots.
  useEffect(() => {
    if (doctor) {
      setTimeSlotsFetched(doctor.timeSlots);
    }
  }, [doctor, timeSlotsFetched]);

  // Defining the event handlers.
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  // Defining the event handlers.
  const handleModeChange = (event) => {
    setCommunicationMode(event.target.value);
  };

  // Defining the handleSubmit function.
  const handleSubmit = async () => {
    // Add a booking slot. (Time Slot is captured but not used in the backend.)
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/slot/${doctor._id}/${communicationMode}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Parse the JSON data.
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      }
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return;
    }

    // Initiate payment.
    try {
      // Make a POST request to the server.
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctor._id}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Parse the JSON data.
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }

    // Close the modal.
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto  ">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px] ">
            <div className="md:col-span-2">
              <div className="flex items-centers gap-5">
                <figure className="max-w-[200px] max-h-[200px] ">
                  <img src={photo} alt="" className="w-full" />
                </figure>

                <div>
                  <span className="bg-pink-200 text-irisBlueColor py-1 px-6 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-md">
                    {specialization}
                  </span>
                  <h3 className="text-[22px] text-headingColor leading-9 mt-3 font-bold   ">
                    Dr. {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[500] text-headingColor ">
                      <img src={starIcon} alt="" />
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text-gray-600 text-[14px] text__para__small  leading-5 md:text-[16px] lg:max-w-[390px]  ">
                    {bio}
                  </p>
                </div>
              </div>
              <div className="mt-[50px] border-b border-solid border-pinkColor ">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab == "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[400] `}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={` ${
                    tab == "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[400] `}
                >
                  Feedback
                </button>
              </div>
              <div className="mt-[50px] ">
                {tab == "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab == "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>
            <div>
              <SidePanel
                setIsModalOpen={setIsModalOpen}
                timeSlots={timeSlots}
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
              />
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Select a Time Slot and Communication Mode
                    </h3>
                    <div className="mt-2 px-7 py-3">
                      {timeSlotsFetched.map((slot, index) => (
                        <div key={index} className="my-2">
                          <label>
                            <input
                              type="radio"
                              name="timeSlot"
                              value={
                                slot.startingTime + " to " + slot.endingTime
                              }
                              onChange={handleTimeSlotChange}
                              checked={
                                selectedTimeSlot ===
                                slot.startingTime + " to " + slot.endingTime
                              }
                            />
                            {slot.day}: {slot.startingTime} - {slot.endingTime}
                          </label>
                        </div>
                      ))}
                      <div className="my-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="communicationMode"
                            value="Chat"
                            onChange={handleModeChange}
                            checked={communicationMode === "Chat"}
                          />
                          <span className="ml-2">Chat</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            name="communicationMode"
                            value="Video"
                            onChange={handleModeChange}
                            checked={communicationMode === "Video"}
                          />
                          <span className="ml-2">Video</span>
                        </label>
                      </div>
                    </div>
                    <div className="items-center px-4 py-3">
                      <button
                        className="btn px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
