const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    // #swagger.tags = ['Home']
    res.send('Student Management API');
});

router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

module.exports = router;