import React from "react";

const addQueryData = ({ query }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  axios
    .post(`http://localhost:8080/api/${query}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      setError(err.message);
    });

  return "Data Send Successfully";
};

export default addQueryData;
