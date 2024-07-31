const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const multer = require('multer');
const path = require('path');
const User = require('./models/User'); // Ensure this path is correct
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the 'uploads' directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Replace with your Google Client ID

// Google OAuth route
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }

    // Generate a JWT token or create a session
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: 'Google authentication failed' });
  }
});

// Add this endpoint to server.js
app.get('/api/categories', (req, res) => {
  const categories = [
    'government-services',
    'health-services',
    'education-services',
    'transport-services',
    'agriculture-services',
    'housing-services'
  ];
  res.json(categories);
});

// Profile picture upload route
app.post('/api/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.body;
  console.log(req.body)
  const profilePictureUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.picture = profilePictureUrl;
      await user.save();
      res.status(200).json({ picture: profilePictureUrl });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/highlighted-services', (req, res) => {
  const highlightedServices = [
    { id: 1, name: 'Passport Application', description: 'Apply for a new passport or renew your existing passport.', image: 'Passport.jpg', url: 'https://eservices.immigration.gov.lk/onlinetd/OnlineTD/' },
    { id: 2, name: 'Driver’s License', description: 'Apply for a new driver’s license or renew your existing license.', image: 'DrivingLicense.jpeg', url: 'https://www.dmt.gov.lk/index.php?option=com_content&view=category&layout=blog&id=12&lang=en&Itemid=204' },
    { id: 3, name: 'Birth Certificate', description: 'Request a copy of your birth certificate.', image: 'BirthCertificate.jpeg', url: 'https://www.rgd.gov.lk/web/index.php?option=com_content&view=article&id=112&Itemid=288&lang=en' },
    { id: 4, name: 'Find a Doctor', description: 'Search for doctors in your area by specialty.', image: 'doctor.jpg', url: 'https://echannelling.com/' },
    { id: 5, name: 'Book an Appointment', description: 'Schedule an appointment with a healthcare provider.', image: 'appointment.jpeg', url: 'https://ihap.health.gov.lk/' },
    { id: 6, name: 'Health Insurance', description: 'Get information about health insurance plans and coverage.', image: 'insurance.jpg', url: 'https://www.srilankainsurance.com/en/personal/health-insurance/comprehensive-health-plus' },
    { id: 7, name: 'School Enrollment', description: 'Enroll your child in a local school.', image: 'enrollment.jpeg', url: 'https://moe.gov.lk/' },
    { id: 8, name: 'Scholarship Programs', description: 'Find and apply for scholarship programs.', image: 'scholarship.jpeg', url: 'https://www.mohe.gov.lk/' },
    { id: 9, name: 'Online Courses', description: 'Access online courses and educational resources.', image: 'online_courses.jpg', url: 'https://www.ou.ac.lk/' },
    
  ];
  res.json(highlightedServices);
});

// New endpoint for category data
app.get('/api/categories/:category', (req, res) => {
  const { category } = req.params;
  const data = {
    'government-services': [
      { id: 1, name: 'Passport Application', description: 'Apply for a new passport or renew your existing passport.', image: 'Passport.jpg', url: 'https://eservices.immigration.gov.lk/onlinetd/OnlineTD/' },
      { id: 2, name: 'Driver’s License', description: 'Apply for a new driver’s license or renew your existing license.', image: 'DrivingLicense.jpeg', url: 'https://www.dmt.gov.lk/index.php?option=com_content&view=category&layout=blog&id=12&lang=en&Itemid=204' },
      { id: 3, name: 'Birth Certificate', description: 'Request a copy of your birth certificate.', image: 'BirthCertificate.jpeg', url: 'https://www.rgd.gov.lk/web/index.php?option=com_content&view=article&id=112&Itemid=288&lang=en' },
    ],
    'health-services': [
      { id: 1, name: 'Find a Doctor', description: 'Search for doctors in your area by specialty.', image: 'doctor.jpg', url: 'https://echannelling.com/' },
      { id: 2, name: 'Book an Appointment', description: 'Schedule an appointment with a healthcare provider.', image: 'appointment.jpeg', url: 'https://ihap.health.gov.lk/' },
      { id: 3, name: 'Health Insurance', description: 'Get information about health insurance plans and coverage.', image: 'insurance.jpg', url: 'https://www.srilankainsurance.com/en/personal/health-insurance/comprehensive-health-plus' },
    ],
    'education-services': [
      { id: 1, name: 'School Enrollment', description: 'Enroll your child in a local school.', image: 'enrollment.jpeg', url: 'https://moe.gov.lk/' },
      { id: 2, name: 'Scholarship Programs', description: 'Find and apply for scholarship programs.', image: 'scholarship.jpeg', url: 'https://www.mohe.gov.lk/' },
      { id: 3, name: 'Online Courses', description: 'Access online courses and educational resources.', image: 'online_courses.jpg', url: 'https://www.ou.ac.lk/' },
    ],
    'transport-services': [
      { id: 1, name: 'Public Transportation', description: 'Get information about public transportation routes and schedules.', image: 'public_transport.jpg', url: 'https://www.transport.gov.lk/web/index.php?option=com_content&view=article&id=115&Itemid=159&lang=en' },
      { id: 2, name: 'Vehicle Registration', description: 'Register your vehicle or renew your vehicle registration.', image: 'vehicle_registration.jpg', url: 'http://www.motortraffic.gov.lk/web/index.php?option=com_content&view=article&id=75&Itemid=98&lang=en' },
      { id: 3, name: 'Traffic Updates', description: 'Get real-time traffic updates and road conditions.', image: 'traffic_updates.jpg', url: 'http://www.police.lk/' },
    ],
    'agriculture-services': [
      { id: 1, name: 'Farming Subsidies', description: 'Information on subsidies for farmers.', image: 'farming_subsidies.jpg', url: 'https://www.agriculture.gov.lk/' },
      { id: 2, name: 'Pest Control', description: 'Services for pest control in agriculture.', image: 'pest_control.jpg', url: 'https://www.agriculture.gov.lk/' },
      { id: 3, name: 'Soil Testing', description: 'Get your soil tested for better crop yield.', image: 'soil_testing.jpg', url: 'https://www.agriculture.gov.lk/' },
    ],
    'housing-services': [
      { id: 1, name: 'Affordable Housing', description: 'Programs for affordable housing.', image: 'affordable_housing.jpg', url: 'https://www.housing.gov.lk/' },
      { id: 2, name: 'Property Tax', description: 'Information on property taxes.', image: 'property_tax.jpg', url: 'https://www.housing.gov.lk/' },
      { id: 3, name: 'Home Renovation', description: 'Services for home renovation and grants.', image: 'home_renovation.jpg', url: 'https://www.housing.gov.lk/' },
    ],
  };

  res.json(data[category] || []);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
