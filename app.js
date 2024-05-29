const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/adnanfayaz07', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for your data
const dataSchema = new mongoose.Schema({
    input1: String,
    input2: String
});
const Data = mongoose.model('Data', dataSchema);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { input1, input2 } = req.body;
    const newData = new Data({ input1, input2 });
    newData.save((err) => {
        if (err) throw err;
        console.log('Data saved successfully');
        res.send('Data saved successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});