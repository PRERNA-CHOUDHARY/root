/**
 * @file Error.jsx. This file defines the error component.
 */

// Import the required libraries.
import PropTypes from "prop-types";

// Error component.
const Error = ({ err }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h3 className="text-black text-[20px] leading-[30px] font-semibold">
        {err}
      </h3>
    </div>
  );
};

Error.propTypes = {
  err: PropTypes.string.isRequired,
};

export default Error;
