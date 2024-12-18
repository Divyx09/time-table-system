import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import YearAndSection from "./YearAndSection";
import GenerateTimetable from "./GenerateTimetable";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/timetable`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {/* <InputForm /> */}
      <YearAndSection />
      <GenerateTimetable data={data} />
    </div>
  );
};

export default Dashboard;
