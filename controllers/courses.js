const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all courses
const getAllCourses = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('courses')
            .find();

        const courses = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single course
const getSingleCourse = async (req, res) => {
    try {
        const courseId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('courses')
            .find({ _id: courseId });

        const courses = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// POST new course
const createCourse = async (req, res) => {
    try {
        const course = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            credits: req.body.credits,
            instructor: req.body.instructor
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('courses')
            .insertOne(course);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({
                message: 'Failed to create course.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update course
const updateCourse = async (req, res) => {
    try {
        const courseId = new ObjectId(req.params.id);

        const course = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            credits: req.body.credits,
            instructor: req.body.instructor
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('courses')
            .replaceOne(
                { _id: courseId },
                course
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to update course.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE course
const deleteCourse = async (req, res) => {
    try {
        const courseId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('courses')
            .deleteOne({ _id: courseId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to delete course.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
};