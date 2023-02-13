const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({mssg: 'Get all workouts'});
});

router.get('/:id', (req, res) => {
    res.json({mssg: 'Get this workout'});
});

router.post('/', (req, res) => {
    res.json({mssg: 'Post a new workout'});
});

router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a workout'});
});

router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a workout'});
});

module.exports = router;