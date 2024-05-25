import express from "express";
import StudentInfo from '../models/student-info.model';
import {
    getAllStudents,
    getStudentById,
    addStudents,
    updateStudent,
    deleteStudentById
} from '../controllers/student.controller';

const router = express.Router();

router.get('/', getAllStudents)

router.get('/:id', getStudentById)

router.post('/', addStudents);

router.put('/:id', updateStudent);

//delete students
router.delete('/:id', deleteStudentById);

export default router;