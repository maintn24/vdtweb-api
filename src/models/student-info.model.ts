import mongoose from "mongoose";

const StudentInfoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter name"]
        },
        gender: {
            type: String,
            required: [true, "Enter gender"]
        },
        university: {
            type: String,
            required: [true, "Enter university"]
        },
    }, {
        timestamps: true,
    }
);

const StudentInfo = mongoose.model("StudentInfo", StudentInfoSchema);

export default StudentInfo;