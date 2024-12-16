import React, { useState } from "react";
import { Form, Input, Button, message, Card, TimePicker } from "antd";
import axios from "axios";

const YearAndSection = () => {
  const [years, setYears] = useState([
    {
      year: "",
      startTime: "",
      endTime: "",
      faculties: [{ name: "" }],
      sections: [
        {
          name: "",
          assignedFacultyForSubject: [
            {
              subjectName: "",
              facultyName: "",
              lectureCount: "",
              lectureTime: "",
            },
          ],
        },
      ],
    },
  ]);

  const addYear = () => {
    setYears([
      ...years,
      {
        year: "",
        startTime: "",
        endTime: "",
        faculties: [{ name: "" }],
        sections: [
          {
            name: "",
            assignedFacultyForSubject: [
              {
                subjectName: "",
                facultyName: "",
                lectureCount: "",
                lectureTime: "",
              },
            ],
          },
        ],
      },
    ]);
  };

  const deleteYear = (yearIndex) => {
    setYears(years.filter((_, index) => index !== yearIndex));
  };

  const updateYearField = (index, field, value) => {
    const updatedYears = [...years];
    updatedYears[index][field] = value;
    setYears(updatedYears);
  };

  const addFaculty = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties.push({ name: "" });
    setYears(updatedYears);
  };

  const deleteFaculty = (yearIndex, facultyIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties.splice(facultyIndex, 1);
    setYears(updatedYears);
  };

  const updateFaculty = (yearIndex, facultyIndex, value) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].faculties[facultyIndex].name = value;
    setYears(updatedYears);
  };

  const addSection = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections.push({
      name: "",
      assignedFacultyForSubject: [
        { subjectName: "", facultyName: "", lectureCount: "", lectureTime: "" },
      ],
    });
    setYears(updatedYears);
  };

  const deleteSection = (yearIndex, sectionIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections.splice(sectionIndex, 1);
    setYears(updatedYears);
  };

  const updateSectionName = (yearIndex, sectionIndex, value) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[sectionIndex].name = value;
    setYears(updatedYears);
  };

  const addSubjectAndFaculty = (yearIndex, sectionIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[
      sectionIndex
    ].assignedFacultyForSubject.push({
      subjectName: "",
      facultyName: "",
      lectureCount: "",
      lectureTime: "",
    });
    setYears(updatedYears);
  };

  const deleteSubjectAndFaculty = (yearIndex, sectionIndex, subjectIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].sections[
      sectionIndex
    ].assignedFacultyForSubject.splice(subjectIndex, 1);
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

  const onSubmit = async () => {
    try {
      for (const year of years) {
        const payload = {
          year: year.year,
          startTime: year.startTime,
          endTime: year.endTime,
          faculties: year.faculties.map((faculty) => ({ name: faculty.name })),
          sections: year.sections.map((section) => ({
            name: section.name,
            assignedFacultyForSubject: section.assignedFacultyForSubject.map(
              (assignment) => ({
                subjectName: assignment.subjectName,
                facultyName: assignment.facultyName,
                lectureCount: assignment.lectureCount,
                lectureTime: assignment.lectureTime,
              }),
            ),
          })),
        };

        await axios.post("http://localhost:8080/api/timetable", payload);
      }

      message.success("Years and their sections added successfully!");
      setYears([
        {
          year: "",
          startTime: "",
          endTime: "",
          faculties: [{ name: "" }],
          sections: [
            {
              name: "",
              assignedFacultyForSubject: [
                {
                  subjectName: "",
                  facultyName: "",
                  lectureCount: "",
                  lectureTime: "",
                },
              ],
            },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Failed to submit years.");
    }
  };

  return (
    <div className='container mt-5 pb-5 col-6'>
      <h3>Add Multiple Years with Sections</h3>

      {years.map((year, yearIndex) => (
        <Card
          key={yearIndex}
          title={`Year ${yearIndex + 1}`}
          style={{ marginBottom: "20px" }}
          extra={
            <Button danger onClick={() => deleteYear(yearIndex)}>
              Delete Year
            </Button>
          }
        >
          <Form layout='vertical'>
            <Form.Item label='Year Name'>
              <Input
                value={year.year}
                onChange={(e) =>
                  updateYearField(yearIndex, "year", e.target.value)
                }
              />
            </Form.Item>
            <div className='row'>
              <Form.Item label='Start Time' className='col-6 '>
                <Input
                  className='w-100'
                  placeholder='e.g. 09:00'
                  value={year.startTime}
                  onChange={(e) =>
                    updateYearField(yearIndex, "startTime", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item className='col-6' label='End Time'>
                <Input
                  className='w-100'
                  placeholder='e.g. 17:00'
                  value={year.endTime}
                  onChange={(e) =>
                    updateYearField(yearIndex, "endTime", e.target.value)
                  }
                />
              </Form.Item>
            </div>

            <div className='border p-2 rounded'>
              <h4>Faculties</h4>
              {year.faculties.map((faculty, facultyIndex) => (
                <Form.Item key={facultyIndex} className='row'>
                  <Input
                    placeholder='Faculty Name'
                    className='col-10'
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
            </div>

            <div className='border rounded p-2 mt-4'>
              <h4>Sections</h4>
              {year.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className='position-relative mt-3 pt-2 border-top'
                >
                  <Form.Item className='row'>
                    <Input
                      className='col-10'
                      placeholder='Section Name'
                      value={section.name}
                      onChange={(e) =>
                        updateSectionName(
                          yearIndex,
                          sectionIndex,
                          e.target.value,
                        )
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

                  <h5 className='border-top mt-3 pt-2'>
                    Subjects and Faculties
                  </h5>
                  {section.assignedFacultyForSubject.map(
                    (assignment, subjectIndex) => (
                      <div key={subjectIndex} className='mt-3'>
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
                        </Form.Item>
                        <Form.Item>
                          <Input
                            placeholder='Lecture Count'
                            type='number'
                            value={assignment.lectureCount}
                            onChange={(e) =>
                              updateSubjectOrFaculty(
                                yearIndex,
                                sectionIndex,
                                subjectIndex,
                                "lectureCount",
                                e.target.value,
                              )
                            }
                          />
                        </Form.Item>
                        <Form.Item>
                          <Input
                            placeholder='Lecture Time'
                            type='number'
                            value={assignment.lectureTime}
                            onChange={(e) =>
                              updateSubjectOrFaculty(
                                yearIndex,
                                sectionIndex,
                                subjectIndex,
                                "lectureTime",
                                e.target.value,
                              )
                            }
                          />
                        </Form.Item>
                        <Button
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
                      </div>
                    ),
                  )}
                  <Button
                    onClick={() =>
                      addSubjectAndFaculty(yearIndex, sectionIndex)
                    }
                  >
                    Add Subject and Faculty
                  </Button>
                </div>
              ))}
              <Button onClick={() => addSection(yearIndex)}>Add Section</Button>
            </div>
          </Form>
        </Card>
      ))}

      <Button type='primary' onClick={addYear} className='mt-3'>
        Add Year
      </Button>
      <Button type='primary' onClick={onSubmit} className='mt-3 ml-3'>
        Submit
      </Button>
    </div>
  );
};

export default YearAndSection;
