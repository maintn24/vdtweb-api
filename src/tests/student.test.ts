import request from 'supertest';
import express from 'express';
import * as studentController from '../controllers/student.controller';
import StudentInfo from '../models/student-info.model';

// Mock the StudentInfo model
jest.mock('../models/student-info.model');

const app = express();
app.use(express.json());
app.get('/students', studentController.getAllStudents);
app.get('/students/:id', studentController.getStudentById);
app.post('/students', studentController.addStudents);
app.put('/students/:id', studentController.updateStudent);
app.delete('/students/:id', studentController.deleteStudentById);

describe('Student Controller', () => {
    describe('GET /students', () => {
        it('should return all students', async () => {
            const mockStudents = [{ name: 'Mai', gender: 'Nữ', university: 'UET' }, { name: 'Minh', gender: 'Nam', university: 'FPT' }];
            (StudentInfo.find as jest.Mock).mockResolvedValue(mockStudents);

            const response = await request(app).get('/students');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudents);
        });

        it('should handle errors', async () => {
            (StudentInfo.find as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/students');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });

    describe('GET /students/:id', () => {
        it('should return a student by id', async () => {
            const mockStudent = { _id: 1, name: 'Minh', gender: 'Nam', university: 'FPT'};
            (StudentInfo.findById as jest.Mock).mockResolvedValue(mockStudent);

            const response = await request(app).get('/students/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudent);
        });

        it('should handle errors', async () => {
            (StudentInfo.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/students/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });

    describe('POST /students', () => {
        it('should create a new student', async () => {
            const mockStudent = { name: 'Mai', gender: 'Nữ', university: 'UET' };
            (StudentInfo.create as jest.Mock).mockResolvedValue(mockStudent);

            const response = await request(app).post('/students').send(mockStudent);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStudent);
        });

        it('should handle errors', async () => {
            (StudentInfo.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/students').send({ name: 'Mai', gender: 'Nữ', university: 'UET' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });

    describe('PUT /students/:id', () => {
        it('should update a student', async () => {
            const mockStudent = { _id: 1, name: 'Minh', gender: 'Nam', university: 'FPT' };
            const updatedStudent = { _id: 1, name: 'Mai', gender: 'Nữ', university: 'UET' };
            (StudentInfo.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockStudent);
            (StudentInfo.findById as jest.Mock).mockResolvedValue(updatedStudent);

            const response = await request(app).put('/students/1').send(updatedStudent);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedStudent);
        });

        it('should handle student not found', async () => {
            (StudentInfo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            const response = await request(app).put('/students/1').send({ _id: 1, name: 'Minh', gender: 'Nam', university: 'FPT' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Student not found' });
        });

        it('should handle errors', async () => {
            (StudentInfo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).put('/students/1').send({ _id: 1, name: 'Minh', gender: 'Nam', university: 'FPT' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });

    describe('DELETE /students/:id', () => {
        it('should delete a student', async () => {
            const mockStudent = { _id: 1, name: 'Minh', gender: 'Nam', university: 'FPT' };
            (StudentInfo.findByIdAndDelete as jest.Mock).mockResolvedValue(mockStudent);

            const response = await request(app).delete('/students/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Delete success' });
        });

        it('should handle student not found', async () => {
            (StudentInfo.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            const response = await request(app).delete('/students/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Student not found' });
        });

        it('should handle errors', async () => {
            (StudentInfo.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/students/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });
});
