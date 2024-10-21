import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";

const InputForm = () => {
  const [facultyDetails, setFacultyDetails] = useState({
    facultyId: 0,
    numberOfFaculty: 0,
    facultyName: "",
    assignedSubject: "",
  });
  const [subjectDetails, setSubjectDetails] = useState([
    {
      subjectId: 0,
      subjectName: "",
      assignedfaculty: "",
      facultyId: 0,
    },
  ]);
  const [classRoomDetails, setClassRoomDetails] = useState([
    {
      classRoomId: 0,
      classRoomNumber: 0,
      classCapcity: 0,
    },
  ]);
  const [labDetails, setLabDetails] = useState([
    {
      labId: 0,
      labNumber: 0,
      labCapacity: 0,
    },
  ]);

  const idGenrator = (initials) => {
    let id = "";
    const ran = parseInt(Math.random() * 999999);
    id = ran + initials;
    return id;
  };

  useEffect(() => {
    console.log(facultyDetails);
  }, [facultyDetails]);

  return (
    <div className='row my-4'>
      <div className='col-6 mx-5'>
        <label>Number Of Faculty:</label>
        <InputNumber
          placeholder='Enter Number of faculty'
          className='w-100'
          onChange={(e) => {
            console.log(e);
            setFacultyDetails([{ ...facultyDetails, numberOfFaculty: e }]);
          }}
        />
      </div>
    </div>
  );
};

export default InputForm;
