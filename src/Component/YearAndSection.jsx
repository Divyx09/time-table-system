import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const YearAndSection = () => {
  const [years, setYears] = useState([
    {
      year: "",
      faculties: [{ name: "" }],
      sections: [
        {
          name: "",
          assignedFacultyForSubject: [
            { subjectName: "", facultyName: "", lectureCount: "" },
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
        faculties: [{ name: "" }],
        sections: [
          {
            name: "",
            assignedFacultyForSubject: [
              { subjectName: "", facultyName: "", lectureCount: "" },
            ],
          },
        ],
      },
    ]);
  };

  const deleteYear = (yearIndex) => {
    setYears(years.filter((_, index) => index !== yearIndex));
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
        { subjectName: "", facultyName: "", lectureCount: "" },
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
          faculties: year.faculties.map((faculty) => ({ name: faculty.name })),
          sections: year.sections.map((section) => ({
            name: section.name,
            assignedFacultyForSubject: section.assignedFacultyForSubject.map(
              (assignment) => ({
                subjectName: assignment.subjectName,
                facultyName: assignment.facultyName,
                lectureCount: assignment.lectureCount,
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
          sections: [
            {
              name: "",
              assignedFacultyForSubject: [
                { subjectName: "", facultyName: "", lectureCount: "" },
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
    <div className='container mt-5 pb-5 col-6 '>
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
            <Form.Item
              label='Year Name'
              rules={[
                { required: true, message: "Please input the year name" },
              ]}
            >
              <Input
                value={year.year}
                onChange={(e) => updateYearName(yearIndex, e.target.value)}
              />
            </Form.Item>

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
                    className='col-2 '
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
              <h4 className=''>Sections</h4>
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
                    className=' bottom-0 end-0 position-absolute'
                    onClick={() =>
                      addSubjectAndFaculty(yearIndex, sectionIndex)
                    }
                  >
                    Add Subject and Faculty
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => addSection(yearIndex)} className='mt-2'>
              Add Section
            </Button>
          </Form>
        </Card>
      ))}

      <div className='text-center'>
        <Button type='primary' onClick={addYear}>
          Add Year
        </Button>
        <Button
          type='primary'
          onClick={onSubmit}
          style={{ marginLeft: "10px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default YearAndSection;
