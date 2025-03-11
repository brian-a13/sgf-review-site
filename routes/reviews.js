const express = require('express');
const router = express.Router();

//const fs = require('fs');
//const path = require('path');
//const filePath = path.join(__dirname, '../data/reviews.json');

const client = require('../db');  // Import CockroachDB connection

// Handle form submissions
router.post('/submit-review', async (req, res) => {
    const { restaurant, location, rating, review, name} = req.body;

    try{
        const sql = "INSERT INTO reviews (restaurant, location, rating, review, name) VALUES ($1, $2, $3, $4, $5) RETURNING *;"
        const values = [restaurant, location, rating, review, name]
        
        const result = await client.query(sql, values);
        console.log('Review submitted:', result.rows[0]);

        res.json({ success: true, message: 'Review submitted successfully!' });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ success: false, message: 'Error saving review.' });
    }
});
    /*      
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
    */

// Get all reviews
/*
router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error retrieving reviews.');
        }

        res.json(JSON.parse(data));
    });
});
*/
module.exports = router;