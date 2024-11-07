import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";

const InputForm = () => {
  // const [facultyDetails, setFacultyDetails] = useState({
  //   facultyId: 0,
  //   numberOfFaculty: 0,
  //   facultyName: "",
  //   assignedSubject: "",
  // });
  // const [subjectDetails, setSubjectDetails] = useState([
  //   {
  //     subjectId: 0,
  //     subjectName: "",
  //     assignedfaculty: "",
  //     facultyId: 0,
  //   },
  // ]);
  // const [classRoomDetails, setClassRoomDetails] = useState([
  //   {
  //     classRoomId: 0,
  //     classRoomNumber: 0,
  //     classCapcity: 0,
  //   },
  // ]);
  // const [labDetails, setLabDetails] = useState([
  //   {
  //     labId: 0,
  //     labNumber: 0,
  //     labCapacity: 0,
  //   },
  // ]);
  const [facultyId, setFacultyId] = useState("")
  const [numberOfFaculty, setNumberOfFaculty] = useState("")
  const [facultyName, setFacultyName] = useState("")
  const [assignedSubject, setAssignedSubjects] = useState("")

  const [subjectId, setSubjectId] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [assignedfaculty , setAssignedfaculty] = useState("")
  
  const [classRoomId, setClassRoomId] = useState("")
  const [classRoomNumber, setClassRoomNumber] = useState("")
  const [classCapacity, setClassCapacity] = useState("")

  const [labId, setLabId] = useState("")
  const [labNumber, setLabNumber] = useState("")
  const [labCapacity, setLabCapacity] = useState("")

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
    <div className='row my-4 mx-0'>
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
