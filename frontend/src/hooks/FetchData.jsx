// import { token } from 'morgan'
import React, { useEffect, useState } from "react";
import { token } from "../Utils/config";

const FetchData = (url) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers:{ Authorization: `Bearer ${token}` },
        });
        const result = await res.json()
        if (!res.ok) {
          throw new Error(result.message)
          }
          console.log("RESULT",result)

        setData(result.data)
        setLoading(false)

      } catch (err) {
        setLoading(false)
        setError(err.message + "wrong")
      }
    };
    fetchData()
  }, [url]);

  return {
    data, loading, error
  }
};

export default FetchData;
