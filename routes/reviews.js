const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/reviews.json');

// Handle form submissions
router.post('/submit-review', (req, res) => {
    const { restaurant, location, rating, review, name} = req.body;

    const newReview = {
        restaurant,
        location,
        rating,
        review,
        name,
        submittedAt: new Date().toISOString(),
    };

    // Read existing data and append new review
    fs.readFile(filePath, 'utf8', (err, data) => {
        let reviews = [];
        if (!err && data) {
            reviews = JSON.parse(data);
        }

        reviews.push(newReview);

        // Save updated reviews
        fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving review:', writeErr);
                return res.status(500).json({ success: false, message: 'Error saving review.' });
            }

            res.json({ success: true, message: 'Review submitted successfully!' });
        });
    });
});

// Get all reviews
router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error retrieving reviews.');
        }

        res.json(JSON.parse(data));
    });
});

module.exports = router;