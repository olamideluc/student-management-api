const router = require('express').Router();
const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');
// #swagger.tags = ['Courses']

router.get('/', coursesController.getAllCourses);
// #swagger.tags = ['Courses']
router.get('/:id', coursesController.getSingleCourse);
// #swagger.tags = ['Courses']
router.post(
    '/',
    validation.courseValidationRules,
    coursesController.createCourse
);
// #swagger.tags = ['Courses']

router.put(
    '/:id',
    validation.courseValidationRules,
    coursesController.updateCourse
);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;