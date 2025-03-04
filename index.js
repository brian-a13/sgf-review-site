const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;      

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Import routes
const reviewRoutes = require('./routes/reviews');
app.use('/reviews', reviewRoutes); // All routes under /reviews


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

