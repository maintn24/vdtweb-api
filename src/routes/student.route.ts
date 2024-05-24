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


//create (add) new students
router.post('/', async (req, res) => {
    try {
        const student = await StudentInfo.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

//update student info
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findByIdAndUpdate(id, req.body);

        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }

        const updatedStudent = await StudentInfo.findById(id);
        res.status(200).json(updatedStudent);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

//delete students
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const student = await StudentInfo.findByIdAndDelete(id, req.body);

        if (!student) {
            return res.status(404).json({message: "Student not found"});
        }

        res.status(200).json({message: "Delete success"});

    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

export default router;