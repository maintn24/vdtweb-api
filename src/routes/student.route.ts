import express from "express";
import StudentInfo from '../models/student-info.model';

const router = express.Router();

//list all the student
router.get('/', async (req, res) => {
    try {
        const students = await StudentInfo.find({});
        res.status(200).json(students);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
})

//get a student
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findById(id);
        res.status(200).json(student);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
})


export default router;