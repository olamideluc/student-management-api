const router = require('express').Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
// #swagger.tags = ['Students']

router.get('/', studentsController.getAllStudents);
// #swagger.tags = ['Students']

router.get('/:id', studentsController.getSingleStudent);
// #swagger.tags = ['Students']
router.post(
    '/',
    validation.studentValidationRules,
    studentsController.createStudent
);
// #swagger.tags = ['Students']

router.put(
    '/:id',
    validation.studentValidationRules,
    studentsController.updateStudent
);

router.delete('/:id', studentsController.deleteStudent);


module.exports = router;