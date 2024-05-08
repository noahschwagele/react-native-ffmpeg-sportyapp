const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 55000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Define a route for streaming media files
app.get('/media/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'media', filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        // Set Content-Type header based on file extension
        const contentType = getContentType(filename);
        res.set('Content-Type', contentType);

        // Set Accept-Ranges header for partial content requests
        res.set('Accept-Ranges', 'bytes');

        // Parse Range header
        const range = req.headers.range;
        const totalSize = fs.statSync(filePath).size;

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
            const chunkSize = (end - start) + 1;

            // Set Content-Range header for partial content response
            res.set('Content-Range', `bytes ${start}-${end}/${totalSize}`);
            res.status(206);

            // Stream partial content
            const stream = fs.createReadStream(filePath, { start, end });
            stream.pipe(res);
        } else {
            // Stream entire file
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        }
    } else {
        res.status(404).send('File not found');
    }
});

// Function to get content type based on file extension
function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.mp4':
            return 'video/mp4';
        case '.mp3':
            return 'audio/mpeg';
        // Add more cases for other media types as needed
        default:
            return 'application/octet-stream';
    }
}
