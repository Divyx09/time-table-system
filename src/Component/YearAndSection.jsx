import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const YearAndSection = () => {
  const [years, setYears] = useState([
    {
      year: "",
      faculties: [{ name: "" }],
      sections: [{ name: "", assignedFacultyForSubject: [] }],
    },
  ]);

  const addYear = () => {
    setYears([
      ...years,
      {
        year: "",
        faculties: [{ name: "" }],
        sections: [{ name: "", assignedFacultyForSubject: [] }],
      },
    ]);
  };

  const deleteYear = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears.splice(yearIndex, 1);
    setYears(updatedYears);
  };

  const updateYearName = (index, value) => {
    const updatedYears = [...years];
    updatedYears[index].year = value;
    setYears(updatedYears);
  };

  const addFaculty = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties.push({ name: "" });
    setYears(updatedYears);
  };

  const updateFaculty = (yearIndex, facultyIndex, value) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties[facultyIndex].name = value;
    setYears(updatedYears);
  };

  const deleteFaculty = (yearIndex, facultyIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties.splice(facultyIndex, 1);
    setYears(updatedYears);
  };

  const addSection = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections.push({
      name: "",
      assignedFacultyForSubject: [],
    });
    setYears(updatedYears);
  };

  const updateSectionName = (yearIndex, sectionIndex, value) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[sectionIndex].name = value;
    setYears(updatedYears);
  };

  const deleteSection = (yearIndex, sectionIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections.splice(sectionIndex, 1);
    setYears(updatedYears);
  };

  const addSubjectAndFaculty = (yearIndex, sectionIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[
      sectionIndex
    ].assignedFacultyForSubject.push({
      subjectName: "",
      facultyName: "",
    });
    setYears(updatedYears);
  };

  const updateSubjectOrFaculty = (
    yearIndex,
    sectionIndex,
    subjectIndex,
    field,
    value,
  ) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[sectionIndex].assignedFacultyForSubject[
      subjectIndex
    ][field] = value;
    setYears(updatedYears);
  };

  const deleteSubjectAndFaculty = (yearIndex, sectionIndex, subjectIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[
      sectionIndex
    ].assignedFacultyForSubject.splice(subjectIndex, 1);
    setYears(updatedYears);
  };

  const onSubmit = async () => {
    try {
      for (const year of years) {
        const payload = {
          year: year.year,
          faculties: year.faculties.map((faculty) => ({ name: faculty.name })),
          sections: year.sections.map((section) => ({
            name: section.name,
            assignedFacultyForSubject: section.assignedFacultyForSubject.map(
              (assignment) => ({
                subjectName: assignment.subjectName,
                facultyName: assignment.facultyName,
              }),
            ),
          })),
        };

        await axios.post("http://localhost:8080/api/years", payload);
      }

      message.success("Years and their sections added successfully!");
      setYears([
        {
          year: "",
          faculties: [{ name: "" }],
          sections: [{ name: "", assignedFacultyForSubject: [] }],
        },
      ]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Failed to submit years.");
    }
  };

  return (
    <div className='container mt-5'>
      <h3>Add Multiple Years with Sections</h3>

      {years.map((year, yearIndex) => (
        <Card
          key={yearIndex}
          title={`Year ${yearIndex + 1}`}
          extra={
            <Button danger onClick={() => deleteYear(yearIndex)}>
              Delete Year
            </Button>
          }
          style={{ marginBottom: "20px" }}
        >
          <Form layout='vertical'>
            <Form.Item label='Year Name'>
              <Input
                value={year.year}
                onChange={(e) => updateYearName(yearIndex, e.target.value)}
              />
            </Form.Item>

            <h4>Faculties</h4>
            {year.faculties.map((faculty, facultyIndex) => (
              <Form.Item key={facultyIndex} className='row'>
                <Input
                  className='col-10'
                  placeholder='Faculty Name'
                  value={faculty.name}
                  onChange={(e) =>
                    updateFaculty(yearIndex, facultyIndex, e.target.value)
                  }
                />
                <Button
                  className='col-2'
                  danger
                  onClick={() => deleteFaculty(yearIndex, facultyIndex)}
                >
                  Delete
                </Button>
              </Form.Item>
            ))}
            <Button onClick={() => addFaculty(yearIndex)}>Add Faculty</Button>

            <h4 className=''>Sections</h4>
            {year.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className=''>
                <Form.Item className='row'>
                  <Input
                    className='col-10'
                    placeholder='Section Name'
                    value={section.name}
                    onChange={(e) =>
                      updateSectionName(yearIndex, sectionIndex, e.target.value)
                    }
                  />
                  <Button
                    className='col-2'
                    danger
                    onClick={() => deleteSection(yearIndex, sectionIndex)}
                  >
                    Delete
                  </Button>
                </Form.Item>
                <h5>Subjects and Faculties</h5>
                {section.assignedFacultyForSubject.map(
                  (assignment, subjectIndex) => (
                    <div key={subjectIndex}>
                      <Form.Item>
                        <Input
                          placeholder='Subject Name'
                          value={assignment.subjectName}
                          onChange={(e) =>
                            updateSubjectOrFaculty(
                              yearIndex,
                              sectionIndex,
                              subjectIndex,
                              "subjectName",
                              e.target.value,
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input
                          placeholder='Faculty Name'
                          value={assignment.facultyName}
                          onChange={(e) =>
                            updateSubjectOrFaculty(
                              yearIndex,
                              sectionIndex,
                              subjectIndex,
                              "facultyName",
                              e.target.value,
                            )
                          }
                        />
                        <Button
                          className='mt-2'
                          danger
                          onClick={() =>
                            deleteSubjectAndFaculty(
                              yearIndex,
                              sectionIndex,
                              subjectIndex,
                            )
                          }
                        >
                          Delete
                        </Button>
                      </Form.Item>
                    </div>
                  ),
                )}
                <Button
                  className='mb-2'
                  onClick={() => addSubjectAndFaculty(yearIndex, sectionIndex)}
                >
                  Add Subject and Faculty
                </Button>
              </div>
            ))}
            <Button onClick={() => addSection(yearIndex)}>Add Section</Button>
          </Form>
        </Card>
      ))}

      <Button type='primary' onClick={addYear}>
        Add Year
      </Button>
      <Button type='primary' onClick={onSubmit} style={{ marginLeft: "10px" }}>
        Submit
      </Button>
    </div>
  );
};

export default YearAndSection;
