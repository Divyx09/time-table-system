import { Input, InputNumber, Space } from "antd";
import React, { useEffect, useState } from "react";

const InputForm = () => {
  const [facultyId, setFacultyId] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [assignedSubject, setAssignedSubject] = useState("");

  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [assignedfaculty, setAssignedfaculty] = useState("");

  const [classRoomId, setClassRoomId] = useState("");
  const [classRoomNumber, setClassRoomNumber] = useState("");
  const [classCapacity, setClassCapacity] = useState("");

  const [labId, setLabId] = useState("");
  const [labNumber, setLabNumber] = useState("");
  const [labCapacity, setLabCapacity] = useState("");

  const idGenrator = (initials) => {
    let id = "";
    const ran = parseInt(Math.random() * 999999);
    id = ran + initials;
    return id;
  };

  const handleFacultyDetails = (name, type) => {
    setFacultyId(idGenrator("fac"));
    type === "name" ? setFacultyName(name) : setAssignedSubject(name);
  };
  return (
    <div className='row my-4 mx-0'>
      <div>
        <div className='row mx-5'>
          <div className='col-6  px-0'>
            <div className='d-flex justify-content-around '>
              <label> Faculty Name</label>
              <label> Assigned Subject</label>
            </div>
            <Space.Compact className='w-100'>
              <Input
                className='text-center'
                placeholder='Enter Faculcty Name'
                onChange={(e) => {
                  handleFacultyDetails(e, "name");
                }}
              />
              <Input
                className='text-center'
                placeholder='Enter Assigned Subject'
                onChange={(e) => {
                  handleFacultyDetails(e, "subject");
                }}
              />
            </Space.Compact>
            <button className='btn btn-secondary btn-sm mt-2'>
              Add Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
