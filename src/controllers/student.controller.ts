import StudentInfo from "../models/student-info.model";
import { Request, Response } from 'express';

export const getAllStudents = async (req : Request, res : Response) => {
    try {
        const students = await StudentInfo.find({});
        res.status(200).json(students);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export const getStudentById = async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findById(id);
        res.status(200).json(student);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export const addStudents = async (req : Request, res : Response) => {
    try {
        const student = await StudentInfo.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export const updateStudent = async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findByIdAndUpdate(id, req.body);

        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentInfo.findById(id);
        res.status(200).json(updatedStudent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export const deleteStudentById = async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findByIdAndDelete(id, req.body);

        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }

        res.status(200).json({message: "Delete success"});

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}


