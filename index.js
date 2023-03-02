const port = 4000;


// Import express for creating a webserver
const express = require(
  'express'
);

// Import path to handle filepaths
const path = require('path');

// Create a webserver
const app = express();

// Serve the files in the dist folder
app.use(express.static('dist'));

// Always serve index.html if nothing else found
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

// Start the webserver on a port
app.listen(port, () => console.log('Listening on port ' + port));