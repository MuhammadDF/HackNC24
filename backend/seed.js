const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Import models
const User = require("./User");
const Event = require("./Event");
const Course = require("./Course");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB for seeding"))
.catch((error) => console.error("MongoDB connection error:", error));

// Sample data
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

// Insert data function
async function seedDatabase() {
    try {
        // Clear collections
        await User.deleteMany({});
        await Event.deleteMany({});
        
        // Insert data
        const createdEvent1 = new Event(event1);
        const createdUser1 = new User(user1);
        
        await createdEvent1.save();
        await createdUser1.save();

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
