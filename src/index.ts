import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import StudentInfo from './models/student-info.model';
import studentRoute from "./routes/student.route";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api/students", studentRoute);

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log('Connection failed:', error));
