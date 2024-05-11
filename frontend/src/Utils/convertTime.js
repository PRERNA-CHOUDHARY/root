/**
 * This file exports a function that converts a 24-hour time to a 12-hour time.
 */

// Function to convert a 24-hour time to a 12-hour time.
const convertTime = (time) => {
  // Split the time into hours and minutes.
  const timeParts = time.split(":");

  // Parse the hours and minutes.
  let hrs = parseInt(timeParts[0]);
  const min = parseInt(timeParts[1]);
  let meridiem = "AM";

  // If the hours are greater than or equal to 12, set the meridiem to "PM".
  if (hrs >= 12) {
    meridiem = "PM";
    if (hrs > 12) {
      hrs -= 12;
    }
  }

  // If the hours are 0, set them to 12.
  return (
    hrs.toString().padStart(2) +
    ":" +
    min.toString().padStart(2, "0") +
    " " +
    meridiem
  );
};
export default convertTime;
