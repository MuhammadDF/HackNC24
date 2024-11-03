import { Button } from "@mui/material";
import axios from "axios";

const DummyUser = () => {
    const course1 = {
        courseName: "Computer Science 101",
        professor: "Dr. Smith",
        section: 1,
    };

    const course2 = {
        courseName: "Mathematics 201",
        professor: "Dr. Brown",
        section: 2,
    };

    const event1 = {
        name: "Orientation",
        description: "Welcome event for new students",
        duration: 2,
        location: "Main Auditorium B",
        cap: 100,
        course: course1,  // Embedding course data in event
        attendees: ["user1@example.com", "user2@example.com"],
    };

    const user1 = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123", // Note: In production, passwords should be hashed!
        phoneNumber: "1234567890",
        courses: [course1, course2],
        attendingEvents: ["Orientation"],
    };

    const handleClick = () => {
        axios.get("/users")
            .then(response => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log("Abid Axios Error");
                console.log(err);
            })
    }

    return(
        <button onClick={handleClick}></button>
    );
}

export default DummyUser;