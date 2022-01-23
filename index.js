const { application } = require('express');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course1' },
    { id: 3, name: 'course1' }
]

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Not Found");
    }
    res.send(course)
});
app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }).options({ abortEarly: false });
    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);

    }

    const course = {
        name: req.body.name,
        id: courses.length + 1,
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Not Found");

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }).options({ abortEarly: false });
    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Not Found");

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course);
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));