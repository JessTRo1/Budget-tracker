const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }

};
async function login(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  
    }
}
module.exports = { register, login };