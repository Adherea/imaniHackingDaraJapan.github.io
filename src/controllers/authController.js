const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function validateUserInput(req, res) {
  // Get the user input from the request body
  const { email, username, password } = req.body;

  // Validate the email address
  if (!email || !email.trim()) {
    res.status(400).json({ error: 'Email address is required.' });
    return false;
  }

  // Validate the username
  if (!username || !username.trim()) {
    res.status(400).json({ error: 'Username is required.' });
    return false;
  }

  // Validate the password
  if (!password || !password.trim()) {
    res.status(400).json({ error: 'Password is required.' });
    return false;
  }

  // User input is valid
  return true;
}


async function checkUniqueEmailAndUsername(req, res) {
  const { email, username } = req.body;

  // Check for existing user with the same email
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    res.status(400).json({ error: 'Email already exists.' });
    return false;
  }

  // Check for existing user with the same username
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    res.status(400).json({ error: 'Username already exists.' });
    return false;
  }

  // Email and username are unique
  return true;
}
const register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
  // Validate user input
  await validateUserInput(req, res);
  if (res.statusCode !== 200) return; // If validation failed, stop further processing

  // Check for unique email and username
  await checkUniqueEmailAndUsername(req, res);
  if (res.statusCode !== 200) return; // If uniqueness check failed, stop further processing

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ email, username, password: hashedPassword });

  // Save user to database
  await newUser.save();

  // Send registration success response
  res.status(201).json({ message: 'User registered successfully' });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare provided password with hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // Send login success response with JWT
  res.status(200).json({ token });
};

const logout = async (req, res) => {
  try {
    // Extract the JWT from the Authorization header
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];

    // Invalidate the JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        // Handle invalid token and return the response
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Update user's session status to inactive
      const userId = decodedToken.userId;
      await User.findByIdAndUpdate(userId, { sessionStatus: 'inactive' });

      // Send logout success response
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { register, login, logout };
