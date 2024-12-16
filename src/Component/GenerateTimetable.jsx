import React, { useState } from "react";

const GenerateTimetable = ({ data }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const bufferTimeSlots = 1; // 1 slot gap (55 minutes) between consecutive lectures

  // Helper: Convert time ("HH:MM") to minutes
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Helper: Convert minutes to time ("HH:MM")
  const minutesToTime = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Initialize timetable for each year and section
  const generateTimetable = () => {
    const timetable = {};
    const facultySchedule = {}; // To track faculty busy slots

    data?.forEach((yearData) => {
      const { year, startTime, endTime, sections } = yearData;
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const totalSlots = Math.floor((endMinutes - startMinutes) / 55); // Assume 55-minute slots

      // Adjust for the lunch break by reducing one slot from totalSlots
      const slotsBeforeLunch = Math.floor(totalSlots / 2);
      const slotsAfterLunch = totalSlots - slotsBeforeLunch - 1; // One slot for the lunch break

      if (!timetable[year]) timetable[year] = {};

      sections.forEach((section) => {
        const { name: sectionName, assignedFacultyForSubject } = section;
        if (!timetable[year][sectionName]) timetable[year][sectionName] = {};

        days.forEach((day) => {
          if (!timetable[year][sectionName][day]) {
            timetable[year][sectionName][day] = Array(totalSlots).fill(null);
          }

          // Insert lunch break (assuming after the 3rd slot)
          timetable[year][sectionName][day][slotsBeforeLunch] = {
            subject: "Lunch Break",
            faculty: "N/A",
          };
        });

        assignedFacultyForSubject.forEach((subject) => {
          const { subjectName, facultyName, lectureCount, lectureTime } =
            subject;
          const slotsNeeded = Math.ceil(lectureTime / 55);
          let remainingLectures = lectureCount;

          days.forEach((day) => {
            if (remainingLectures === 0) return;

            let lastScheduledSlot = -bufferTimeSlots; // Keep track of the last scheduled slot with buffer time

            timetable[year][sectionName][day].forEach((slot, index) => {
              // Skip if the slot is already occupied or faculty has a schedule conflict
              if (
                remainingLectures === 0 ||
                timetable[year][sectionName][day][index] !== null ||
                facultySchedule[facultyName]?.[day]?.includes(index) ||
                index === slotsBeforeLunch // Skip lunch break slot
              ) {
                return;
              }

              // Ensure gap between consecutive lectures
              if (index <= lastScheduledSlot + bufferTimeSlots) return;

              const slotRange = Array.from(
                { length: slotsNeeded },
                (_, i) => index + i,
              );

              const lastSlotMinutes =
                startMinutes + slotRange[slotRange.length - 1] * 55;
              if (lastSlotMinutes > endMinutes) return;

              const isSlotAvailable = slotRange.every(
                (slotIndex) =>
                  timetable[year][sectionName][day][slotIndex] === null &&
                  !facultySchedule[facultyName]?.[day]?.includes(slotIndex) &&
                  slotIndex !== slotsBeforeLunch, // Ensure no class during lunch
              );

              if (isSlotAvailable) {
                slotRange.forEach((slotIndex) => {
                  timetable[year][sectionName][day][slotIndex] = {
                    subject: subjectName,
                    faculty: facultyName,
                  };

                  if (!facultySchedule[facultyName])
                    facultySchedule[facultyName] = {};
                  if (!facultySchedule[facultyName][day]) {
                    facultySchedule[facultyName][day] = [];
                  }
                  facultySchedule[facultyName][day].push(slotIndex);
                });

                lastScheduledSlot = slotRange[slotRange.length - 1]; // Update last scheduled slot
                remainingLectures -= 1;
              }
            });
          });

          if (remainingLectures > 0) {
            console.warn(
              `Unassigned lectures for ${subjectName} in ${year} ${sectionName}`,
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
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={i}>{minutesToTime(9 * 60 + 30 + i * 55)}</th>
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

/***
 * 
 * import React, { useState } from "react";

const GenerateTimetable = ({ data }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const bufferTimeSlots = 1; // 1 slot gap (55 minutes) between consecutive lectures

  // Helper: Convert time ("HH:MM") to minutes
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Helper: Convert minutes to time ("HH:MM")
  const minutesToTime = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Initialize timetable for each year and section
  const generateTimetable = () => {
    const timetable = {};
    const facultySchedule = {}; // To track faculty busy slots

    data?.forEach((yearData) => {
      const { year, startTime, endTime, sections } = yearData;
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const totalSlots = Math.floor((endMinutes - startMinutes) / 55); // Assume 55-minute slots

      // Adjust for the lunch break by reducing one slot from totalSlots
      const slotsBeforeLunch = Math.floor(totalSlots / 2);
      const slotsAfterLunch = totalSlots - slotsBeforeLunch - 1; // One slot for the lunch break

      if (!timetable[year]) timetable[year] = {};

      sections.forEach((section) => {
        const { name: sectionName, assignedFacultyForSubject } = section;
        if (!timetable[year][sectionName]) timetable[year][sectionName] = {};

        days.forEach((day) => {
          if (!timetable[year][sectionName][day]) {
            timetable[year][sectionName][day] = Array(totalSlots).fill(null);
          }

          // Insert lunch break (assuming after the 3rd slot)
          timetable[year][sectionName][day][slotsBeforeLunch] = {
            subject: "Lunch Break",
            faculty: "N/A",
          };
        });

        assignedFacultyForSubject.forEach((subject) => {
          const { subjectName, facultyName, lectureCount, lectureTime } =
            subject;
          const slotsNeeded = Math.ceil(lectureTime / 55);
          let remainingLectures = lectureCount;

          days.forEach((day) => {
            if (remainingLectures === 0) return;

            let lastScheduledSlot = -bufferTimeSlots; // Keep track of the last scheduled slot with buffer time
            let scheduledOnDay = false;

            // Try to schedule lectures across multiple days, ensuring no conflicts
            while (remainingLectures > 0 && !scheduledOnDay) {
              timetable[year][sectionName][day].forEach((slot, index) => {
                // Skip if the slot is already occupied or faculty has a schedule conflict
                if (
                  remainingLectures === 0 ||
                  timetable[year][sectionName][day][index] !== null ||
                  facultySchedule[facultyName]?.[day]?.includes(index) ||
                  index === slotsBeforeLunch // Skip lunch break slot
                ) {
                  return;
                }

                // Ensure gap between consecutive lectures
                if (index <= lastScheduledSlot + bufferTimeSlots) return;

                const slotRange = Array.from(
                  { length: slotsNeeded },
                  (_, i) => index + i,
                );

                const lastSlotMinutes =
                  startMinutes + slotRange[slotRange.length - 1] * 55;
                if (lastSlotMinutes > endMinutes) return;

                const isSlotAvailable = slotRange.every(
                  (slotIndex) =>
                    timetable[year][sectionName][day][slotIndex] === null &&
                    !facultySchedule[facultyName]?.[day]?.includes(slotIndex) &&
                    slotIndex !== slotsBeforeLunch, // Ensure no class during lunch
                );

                if (isSlotAvailable) {
                  slotRange.forEach((slotIndex) => {
                    timetable[year][sectionName][day][slotIndex] = {
                      subject: subjectName,
                      faculty: facultyName,
                    };

                    if (!facultySchedule[facultyName])
                      facultySchedule[facultyName] = {};
                    if (!facultySchedule[facultyName][day]) {
                      facultySchedule[facultyName][day] = [];
                    }
                    facultySchedule[facultyName][day].push(slotIndex);
                  });

                  lastScheduledSlot = slotRange[slotRange.length - 1]; // Update last scheduled slot
                  remainingLectures -= 1;
                  scheduledOnDay = true; // Mark as scheduled on this day
                }
              });

              // If the lecture couldn't be scheduled on this day, move to the next day
              if (!scheduledOnDay) {
                const nextDayIndex = (days.indexOf(day) + 1) % days.length;
                day = days[nextDayIndex];
              }
            }

            if (remainingLectures > 0) {
              console.warn(
                `Unassigned lectures for ${subjectName} in ${year} ${sectionName}`,
              );
            }
          });
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
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={i}>{minutesToTime(9 * 60 + 30 + i * 55)}</th>
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

 * 
 * 
 * 
 * 
 * 
 * **/
