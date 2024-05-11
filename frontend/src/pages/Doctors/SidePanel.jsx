/**
 * @file SidePanel component contains the side panel of the doctor's page.
 */

// Import the required modules.
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Import the utility functions.
import convertTime from "../../Utils/convertTime";
import { BASE_URL, token } from "../../Utils/config";

// Define the SidePanel component.
const SidePanel = ({ timeSlots, doctorId, ticketPrice }) => {
  // Define the bookingHandler function.
  const bookingHandler = async () => {
    try {
      // Make a POST request to the server.
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md pe-10">
      <div className="flex items-center justify-between leading-6">
        <p className="text__para mt-0 font-[600]">Appointment Charges</p>
        <span className="text-[18px] leading-7 lg:text:[18px] lg:leading-8 text-pinkColor font-[800] ">
          ₹ {ticketPrice}
        </span>
      </div>
      <div className="mt-[30px ]">
        <p className="text__para mt-0 font-[400] text-headingColor">
          {" "}
          Available Time Slots:
        </p>
        <ul className="mt-1">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2 ">
              <p className="text-[15px] leading-4 text-textColor font-[400]">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className=" text-[15px] leading-4 text-textColor font-[400]">
                {convertTime(item.startingTime)} -{convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={bookingHandler}
          className="btn px-2 w-full rounded-md items-center"
        >
          Book &nbsp;appointment
        </button>
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  timeSlots: PropTypes.array,
  doctorId: PropTypes.string,
  ticketPrice: PropTypes.number,
};

export default SidePanel;
