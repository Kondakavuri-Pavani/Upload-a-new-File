const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/', // Ensure this matches the path
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  }
});

// Initialize upload
const upload = multer({ storage: storage }).array('files'); // Use .array for multiple files

// Serve static files
app.use(express.static('./public'));

// Route to handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message); // Send error message
    }
    if (req.files.length === 0) {
      return res.status(400).send('Error: No files selected!'); // Handle no files case
    }
    res.send(`Files uploaded: ${req.files.map(file => file.originalname).join(', ')}`);
  });
});

// Start server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
