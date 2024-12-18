import React from "react";

const GenerateTimetable = ({ data }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slotDuration = 55; 

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate timetable
  const generateTimetable = () => {
    const timetable = {};
    const facultySchedule = {}; // To track faculty's busy slots

    data?.forEach((yearData) => {
      const { year, startTime, endTime, sections } = yearData;
      const totalSlots = Math.floor(
        (timeToMinutes(endTime) - timeToMinutes(startTime)) / slotDuration,
      );

      if (!timetable[year]) timetable[year] = {};

      sections.forEach((section) => {
        const { name: sectionName, assignedFacultyForSubject } = section;
        if (!timetable[year][sectionName]) timetable[year][sectionName] = {};

        days.forEach((day) => {
          timetable[year][sectionName][day] = Array(totalSlots).fill(null);
        });

        assignedFacultyForSubject.forEach((subject) => {
          const { subjectName, facultyName, lectureCount, lectureTime } =
            subject;

          let remainingLectures = lectureCount;

          days.forEach((day) => {
            if (remainingLectures === 0) return;

            const daySlots = timetable[year][sectionName][day];
            const facultyDaySchedule =
              facultySchedule[facultyName]?.[day] || [];

            let addedLecture = false;

            for (let index = 0; index < daySlots.length; index++) {
              // Check slot availability for 110 min lectures
              const slotsNeeded = lectureTime === 110 ? 2 : 1;

              const canSchedule = Array.from(
                { length: slotsNeeded },
                (_, i) => index + i,
              ).every(
                (slotIndex) =>
                  slotIndex < daySlots.length &&
                  daySlots[slotIndex] === null &&
                  !facultyDaySchedule.includes(slotIndex),
              );

              if (canSchedule) {
                Array.from(
                  { length: slotsNeeded },
                  (_, i) => index + i,
                ).forEach((slotIndex) => {
                  daySlots[slotIndex] = {
                    subject: subjectName,
                    faculty: facultyName,
                  };

                  // Track faculty's schedule
                  if (!facultySchedule[facultyName])
                    facultySchedule[facultyName] = {};
                  if (!facultySchedule[facultyName][day])
                    facultySchedule[facultyName][day] = [];
                  facultySchedule[facultyName][day].push(slotIndex);
                });

                remainingLectures--;
                addedLecture = true;
                break;
              }
            }

            if (addedLecture) return; // Move to the next day
          });

          if (remainingLectures > 0) {
            console.warn(
              `Unscheduled lectures for ${subjectName} in section ${sectionName}`,
            );
          }
        });
      });
    });

    return timetable;
  };

  const timetable = generateTimetable();

  return (
    <div>
      {Object.keys(timetable).map((year) => (
        <div key={year}>
          <h2>{year}</h2>
          {Object.keys(timetable[year]).map((section) => (
            <div key={section} style={{ marginBottom: "30px" }}>
              <h3>Section {section}</h3>
              <table border='1' style={{ width: "100%", textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Day</th>
                    {Array.from(
                      {
                        length: Math.floor(
                          (timeToMinutes(data[0].endTime) -
                            timeToMinutes(data[0].startTime)) /
                            slotDuration,
                        ),
                      },
                      (_, i) =>
                        minutesToTime(
                          timeToMinutes(data[0].startTime) + i * slotDuration,
                        ),
                    ).map((time, i) => (
                      <th key={i}>{time}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td>{day}</td>
                      {timetable[year][section][day].map((slot, index) => (
                        <td key={index}>
                          {slot ? (
                            <div>
                              <b>{slot.subject}</b>
                              <br />
                              <i>{slot.faculty}</i>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GenerateTimetable;
