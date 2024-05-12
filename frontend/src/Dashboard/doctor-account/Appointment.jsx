/**
 * @description: This file is used to display the appointment details of the user.
 */

// Import the necessary modules.
import PropTypes from "prop-types";

// Import the utility functions.
import { formatDate } from "../../Utils/formatDate";

// Define the Appointment component.
const Appointment = ({ appointments }) => {
  return (
    <>
      <div>Appointment</div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-fuchsia-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Booked on
            </th>
            <th scope="col" className="px-6 py-3">
              Mode
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item) => (
            <tr key={item._id}>
              <th
                scope="row"
                className="flex items-center px-6  py-4 text-gray-900 whitespace-nowrap"
              >
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item?.user?.name || "Purnita"}
                  </div>
                  <div className="text-normal text-gray-500">
                    {item?.user?.email || "purnita@gmail.com"}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{item?.user?.gender || "female"}</td>
              <td className="px-6 py-4">
                {item?.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-300  mr-2">
                      Paid
                    </div>
                  </div>
                )}
                {!item?.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-300  mr-2">
                      Unpaid
                    </div>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{formatDate(item?.createdAt)}</td>
              <td className="px-6 py-4">
                <a
                  href={
                    item?.mode.toLowerCase() === "chat"
                      ? "http://localhost:3000/chat"
                      : "http://localhost:3000/video"
                  }
                  target="_black"
                  rel="noreferrer noopener"
                >
                  {item?.mode}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Appointment.propTypes = {
  appointments: PropTypes.array,
};

export default Appointment;
