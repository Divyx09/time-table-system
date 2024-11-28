import { Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

const InputForm = () => {
  const [timeSlots, setTimeSlots] = useState("");

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

  const [yearName, setYearName] = useState("");
  const [section, setSection] = useState("");
  const [yearDetailArray, setYearDetailArray] = useState([]);

  const handleYearSubmit = () => {
    const newYear = {
      yearID: idGenrator("year"),
      yearName: yearName,
      section: "",
      semester: "",
    };
    setYearDetailArray((prev) => [...prev, newYear]);
    console.log(yearDetailArray);
    setYearName("");
    
  };

  const handleYearNameChange = (e) => {
    setYearName(e.target.value);
  };

  useEffect(() => {
    if (yearDetailArray.length > 0) {
      console.log(yearDetailArray);
    }
  }, [yearDetailArray]);

  const [facultyDataArray, setFacultyDataArray] = useState([
    { facultyID: idGenrator("fac"), facultyName: "", assignedSubject: "" },
  ]);

  const handleFacultyNameChange = (index, value) => {
    const newFacultyData = [...facultyDataArray];
    newFacultyData[index].facultyName = value;
    setFacultyDataArray(newFacultyData);
  };

  const handleAssignedSubjectChange = (index, value) => {
    const newFacultyData = [...facultyDataArray];
    newFacultyData[index].assignedSubject = value;
    setFacultyDataArray(newFacultyData);
  };

  const [subjectDetailArray, setSubjectDetailArray] = useState([
    { subjectID: idGenrator("sub"), assignedSubject: "", facultyName: "" },
  ]);

  const addNewInputFields = () => {
    setFacultyDataArray([
      ...facultyDataArray,
      { facultyID: idGenrator("fac"), facultyName: "", assignedSubject: "" },
    ]);
    setSubjectDetailArray([
      ...subjectDetailArray,
      { subjectID: idGenrator("sub"), assignedSubject: "", facultyName: "" },
    ]);
  };

  const storeFacultyData = () => {
    const newSubjectDetailArray = facultyDataArray.map((faculty) => ({
      subjectID: idGenrator("sub"),
      assignedSubject: faculty.assignedSubject,
      facultyName: faculty.facultyName,
    }));
    console.log("Faculty Data Array:", facultyDataArray);
    setSubjectDetailArray(newSubjectDetailArray);
    toast.success("Data entered successfully");
    setFacultyDataArray([
      { facultyID: idGenrator("fac"), facultyName: "", assignedSubject: "" },
    ]);
  };

  useEffect(() => {
    if (subjectDetailArray.length > 0) {
      console.log("Subject Details Array", subjectDetailArray);
    }
  }, [subjectDetailArray]);

  const handleDeleteButton = (index) => {
    const newFacultyData = facultyDataArray.filter((_, i) => i !== index);
    setFacultyDataArray(newFacultyData);
  };

  return (
    <>
      <div className="row my-4 mx-0">
        <div>
          <div className="row mx-5">
            <Input
              className="col-6"
              placeholder="Enter Year"
              value={yearName}
              onChange={handleYearNameChange}
            />
          </div>
          <button
            className="btn btn-success btn-sm mt-2 mx-5 mb-4"
            onClick={handleYearSubmit}
          >
            Submit
          </button>
          <div className="row mx-5">
            <Input className="col-6" placeholder="Enter Number of section" />
          </div>
          <button className="btn btn-success btn-sm mt-2 mx-5 mb-4">
            Submit
          </button>
          <div></div>
          <div className="row mx-5">
            <div className="col-6  px-0">
              <div className="d-flex justify-content-around ">
                <label> Faculty Name</label>
                <label> Assigned Subject</label>
              </div>
              {facultyDataArray.map((faculty, index) => (
                <Space.Compact className="w-100 mb-2" key={index}>
                  <Input
                    className="text-center"
                    placeholder="Enter Faculty Name"
                    value={faculty.facultyName}
                    onChange={(e) =>
                      handleFacultyNameChange(index, e.target.value)
                    }
                  />
                  <Input
                    className="text-center"
                    placeholder="Enter Assigned Subject"
                    value={faculty.assignedSubject}
                    onChange={(e) =>
                      handleAssignedSubjectChange(index, e.target.value)
                    }
                  />
                  <Button
                    className="btn btn-danger d-flex align-items-center"
                    onClick={() => handleDeleteButton(index)}
                  >
                    <MdDelete />
                  </Button>
                </Space.Compact>
              ))}
              <button
                className="btn btn-secondary btn-sm mt-2"
                onClick={addNewInputFields}
              >
                Add Faculty
              </button>
              <button
                className="btn btn-primary btn-sm mt-2 ml-2 mx-2"
                onClick={storeFacultyData}
              >
                Store Faculty Data
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" position="top-center" pauseOnHover={false} />
    </>
  );
};

export default InputForm;
