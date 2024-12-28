const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

const dbURI = 'mongodb://localhost:27017/TestForm'; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  place: String,
  mobile: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

app.get('/register', (req, res) => {
  res.send('This is the registration page.');
});

app.post('/register', async (req, res) => {
  const { name, email, place, mobile } = req.body;

  if (!name || !email || !place || !mobile) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const newRegistration = new Registration({ name, email, place, mobile });
    await newRegistration.save(); 
 let result =await Registration.find()
    console.log('Registration data received:', { name, email, place, mobile });
    res.status(200).json({ message: 'Registration successful!',data:result });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Something went wrong, please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
