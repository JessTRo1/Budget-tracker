// Handle user registration and login
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');

 
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    if (password.length < 6 || !password.match(/[0-9]/) || !password.match(/[*.\-!@#$%^&*]/)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long and include a number and a special character' });
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const jwtSecret = process.env.JWT_SECRET || randomUUID();
    const id = randomUUID(); 
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      jwtSecret,
      id
    });
    await newUser.save();
    
    const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, email: newUser.email, id: newUser.id },
        jwtSecret,
        { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(201).json({ message: 'User registered successfully', token });
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
        } else {
            const token = jwt.sign(
                { userId: user._id, username: user.username, email: user.email, id: user.id },
                process.env.JWT_SECRET || user.jwtSecret,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        }
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  
    }
}
module.exports = { register, login };