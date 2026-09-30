const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all students
const getAllStudents = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .find();

        const students = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single student
const getSingleStudent = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .find({ _id: studentId });

        const students = await result.toArray();

        res.status(200).json(students[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const createStudent = async (req, res) => {
    try {
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            major: req.body.major,
            gpa: req.body.gpa,
            graduationYear: req.body.graduationYear,
            enrollmentStatus: req.body.enrollmentStatus
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .insertOne(student);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({
                message: 'Failed to create student.'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const updateStudent = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);

        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            major: req.body.major,
            gpa: req.body.gpa,
            graduationYear: req.body.graduationYear,
            enrollmentStatus: req.body.enrollmentStatus
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .replaceOne(
                { _id: studentId },
                student
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to update student.'
            });
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const deleteStudent = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to delete student.'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
};