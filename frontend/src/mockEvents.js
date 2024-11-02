// src/mockEvents.js
const mockEvents = [
    {
      fName: "John",
      lName: "Doe",
      description: "Study session for Calculus.",
      duration: 2,
      location: "Room 101",
      cap: 30,
      course: { courseName: "Calculus", courseCode: "MATH101" },
      attendees: [{ name: "Jane Smith" }, { name: "Robert Brown" }]
    },
    {
      fName: "Emily",
      lName: "Clark",
      description: "Group study for Physics exam.",
      duration: 1.5,
      location: "Library",
      cap: 20,
      course: { courseName: "Physics", courseCode: "PHYS202" },
      attendees: [{ name: "Sarah Lee" }]
    }
    // Add more events as needed
  ];
  
  export default mockEvents;
  