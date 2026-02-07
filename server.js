const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ADDED THIS to read form data
app.use(cors());


// 3. Import Models
const User = require('./models/User'); // Removed 'models/'
const Post = require('./models/Post'); // Removed 'models/'

// 4. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

// --- ROUTES ---

// Home route: Shows your HTML form
app.get('/', (req, res) => {
  // Use process.cwd() to find the html folder in your 'abc' directory
  res.sendFile(path.join(process.cwd(), 'html', 'create-post.html'));
});

// CREATE POST ROUTE: Matches the 'action' in your HTML form
app.post('/api/posts', async (req, res) => {
  try {
    const { location, type, time, notes } = req.body;
    
    const newPost = new Post({
      title: location, // Mapping 'location' to 'title' for now
      type: type,
      notes: notes,
      // We'll leave coordinates empty for now or use McGill defaults
      location: { type: 'Point', coordinates: [-73.5772, 45.5048] } 
    });

    await newPost.save();
    res.send('<h1>Post Successful!</h1><a href="/">Go Back</a>');
  } catch (err) {
    res.status(400).send("Error saving post: " + err.message);
  }
});

// Login/Register routes remain the same below...
app.post('/api/register', async (req, res) => { /* your existing code */ });
app.post('/api/login', async (req, res) => { /* your existing code */ });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});