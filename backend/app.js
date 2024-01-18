const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());


const atlasConnectionURI =
  "mongodb+srv://patmesh2003:<m7CtJEhB4FhGK7hM>@cluster0.b8mopbg.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(atlasConnectionURI, {
    authSource: "admin",
    user: "patmesh2003",
    pass: "m7CtJEhB4FhGK7hM",
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


  const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    phno: String,
    password: { type: String, required: true },
    dob: Date,
    location: String,
    gender: String,
    profession: String,
    learnings: [{
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
      },
      progress: Number,
      exercisesCompleted: Number,
      totalExercises: Number
    }]
  });
  
  const User = mongoose.model('User-LLG', userSchema);

  
  const languageSchema = new mongoose.Schema({
    name: String,
    details: String,
    exercises: [{
      title: String,
      questions: [{
        question: String,
        options: [String],
        correctOption: Number
      }]
    }]
  });
  
  const Language = mongoose.model('Language', languageSchema);
  
  app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        phno: req.body.phno,
        password: hashedPassword,
        dob: req.body.dob,
        location: req.body.location,
        gender: req.body.gender,
        profession: req.body.profession,
      });
      await user.save();
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/user/:email', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/language/:id', async (req, res) => {
    try {
      const language = await Language.findById(req.params.id);
      if (!language) {
        return res.status(404).json({ error: 'Language not found' });
      }
  
      res.status(200).json(language);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/language', async (req, res) => {
    try {
      const language = new Language(req.body);
      await language.save();
      res.status(201).json({ message: 'Language added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/exercise/:languageId', async (req, res) => {
    try {
      const language = await Language.findById(req.params.languageId);
      if (!language) {
        return res.status(404).json({ error: 'Language not found' });
      }
  
      language.exercises.push(req.body);
      await language.save();
      res.status(201).json({ message: 'Exercise added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/exercise/:languageId/:exerciseId', async (req, res) => {
    try {
      const language = await Language.findById(req.params.languageId);
      if (!language) {
        return res.status(404).json({ error: 'Language not found' });
      }
  
      const exercise = language.exercises.id(req.params.exerciseId);
      if (!exercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
  
      await language.save();
      res.status(200).json({ message: 'Exercise updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
 