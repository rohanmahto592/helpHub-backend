const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function encryptPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error encrypting password: " + error.message);
  }
}

// Function to compare (verify) a plaintext password with a hashed password
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error verifying password: " + error.message);
  }
}

function createToken(payload, expiresIn = "1h") {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    throw new Error("Error creating token: " + error.message);
  }
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Error verifying token: " + error.message);
  }
}

module.exports = { encryptPassword, verifyPassword, createToken, verifyToken };
