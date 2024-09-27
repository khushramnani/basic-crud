const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/BCA', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Schema and Model for DivB Collection
const divBSchema = new mongoose.Schema({
    ID: Number,
    FName: String,
    LName: String,
    Email: String,
    Gender: String,
    City: String
});

const DivB = mongoose.model('DivB', divBSchema);

// CRUD operations
// Create a new record
app.post('/divb', async (req, res) => {
    const { ID, FName, LName, Email, Gender, City } = req.body;

    const divB = new DivB({
        ID,
        FName,
        LName,
        Email,
        Gender,
        City
    });

    try {
        const result = await divB.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read all records
app.get('/divb', async (req, res) => {
    try {
        const divBList = await DivB.find();
        res.send(divBList);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a record by ID
app.put('/divb/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const result = await DivB.findByIdAndUpdate(id, update, { new: true });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a record by ID
app.delete('/divb/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await DivB.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Server Listening
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
