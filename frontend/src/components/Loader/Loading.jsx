/**
 * @desc Loading component is used to show loading spinner when data is being fetched from the server.
 */

// Import the required modules.
import HashLoader from "react-spinners/HashLoader";

// Loading component.
const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader color="#a21caf" />
    </div>
  );
};

export default Loading;
