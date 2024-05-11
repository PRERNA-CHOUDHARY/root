/**
 * @description: This file contains the custom hook to fetch data from the server.
 */

// Import the necessary modules.
import { useEffect, useState } from "react";

// Import the token from the config file.
import { token } from "../Utils/config";

// Define the FetchData custom hook.
const FetchData = (url) => {
  // Define the state variables.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the data from the server.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the data from the server.
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        // Check if the response is not ok.
        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message + "wrong");
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default FetchData;
