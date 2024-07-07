const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error in getCourses function');
    }
};

exports.createCourse = async (req, res) => {
    const { title, description, price } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            price
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateCourse = async (req, res) => {
    const { title, description, price } = req.body;

    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        course.title = title;
        course.description = description;
        course.price = price;

        course = await Course.findByIdAndUpdate(req.params.id, { $set: course }, { new: true });

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        await Course.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Course removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
