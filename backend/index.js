const express = require('express');
const dotenv = require('dotenv'); // Add this line to import the dotenv package

dotenv.config(); // Add this line to load the .env file

// create a new MERN app backend
const app = express();

// Add your backend routes and logic here
port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
