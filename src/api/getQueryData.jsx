import axios from "axios";
import { useState } from "react";

const getQueryData = ({ query }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  axios
    .get(`http://localhost:8080/api/${query}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      setError(err.message);
    });

  return { data, error };
};

export default getQueryData;
