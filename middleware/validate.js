const Joi = require('joi');

const studentValidationRules = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        major: Joi.string().required(),
        gpa: Joi.number().required(),
        graduationYear: Joi.number().required(),
        enrollmentStatus: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

const courseValidationRules = (req, res, next) => {
    const schema = Joi.object({
        courseCode: Joi.string().required(),
        courseName: Joi.string().required(),
        credits: Joi.number().required(),
        instructor: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

module.exports = {
    studentValidationRules,
    courseValidationRules
};