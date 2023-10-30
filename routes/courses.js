const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/CoursesController')

router.get('/', coursesController.getListCourses)
router.post('/add', coursesController.addCourse)
router.put('/edit', coursesController.editCourse)
router.delete('/delete/:id', coursesController.deleteCourse)

module.exports = router;