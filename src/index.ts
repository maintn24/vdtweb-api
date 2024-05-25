import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import StudentInfo from './models/student-info.model';
import studentRoute from "./routes/student.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api/students", studentRoute);

mongoose.connect("mongodb+srv://maintn124:adminPassword@vdt2024db.6hhluvk.mongodb.net/VDT2024API?retryWrites=true&w=majority&appName=VDT2024DB")
    .then(() => {
        console.log('Connected!');
        app.listen(2000, () => {
            console.log("server running on http://localhost:2000");
        });
    })
    .catch(() => console.log('Connection failed'));
