const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  aadhaar: String,
  password: String,
  role: { type: String, default: 'patient' },
}, { timestamps: true });

const User = mongoose.model('userData', userSchema);

const createAdmin = async () => {
  const adminUser = new User({
    name: 'Admin Manikandan',
    email: 'admin@example.com',
    mobile: '9876543210',
    aadhaar: '111122223333',
    password: 'A1234567',
    role: 'admin',
  });

  await adminUser.save();
  console.log('Admin user created:', adminUser);
};

createAdmin();
