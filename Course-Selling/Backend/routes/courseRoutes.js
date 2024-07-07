const express = require('express');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { adminAuth } = require('../middlewares/authMiddleware');

router.get('/', getCourses);
router.post('/', adminAuth, createCourse);
router.put('/:id', adminAuth, updateCourse);
router.delete('/:id', adminAuth, deleteCourse);

module.exports = router;
