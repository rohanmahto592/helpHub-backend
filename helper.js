const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

/**
 * The function `encryptPassword` asynchronously generates a salt and hashes a plain password using
 * bcrypt.
 * @param plainPassword - The `plainPassword` parameter is the user's password that needs to be
 * encrypted for security purposes. This function uses the `bcrypt` library to generate a salt and hash
 * the password before returning the hashed password.
 * @returns The `encryptPassword` function returns the hashed password after encrypting the plain
 * password using bcrypt.
 */
async function encryptPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error encrypting password: " + error.message);
  }
}

/**
 * The function `verifyPassword` compares a plain text password with a hashed password using bcrypt for
 * verification.
 * @param plainPassword - The `plainPassword` parameter is the password entered by the user in plain
 * text, before it is hashed for storage or comparison.
 * @param hashedPassword - The `hashedPassword` parameter in the `verifyPassword` function is the
 * hashed version of a password that has been previously stored in a database or elsewhere for security
 * purposes. When a user attempts to log in, their input password is hashed and compared to this stored
 * hashed password to verify their identity.
 * @returns The `verifyPassword` function returns a boolean value indicating whether the plain password
 * matches the hashed password.
 */
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error verifying password: " + error.message);
  }
}

/**
 * The function `createToken` generates a JWT token with a specified payload and expiration time.
 * @param payload - The `payload` parameter in the `createToken` function is the data object that you
 * want to encode into the token. It typically contains information about the user or any other
 * relevant data that needs to be securely transmitted or stored.
 * @param [expiresIn=1h] - The `expiresIn` parameter in the `createToken` function specifies the time
 * duration for which the token will be valid. It is set to a default value of "1h", which means the
 * token will expire in 1 hour unless a different value is provided when calling the function.
 * @returns The function `createToken` returns a JSON Web Token (JWT) that is generated using the
 * `jwt.sign` method with the provided payload, secret key, and expiration time.
 */
function createToken(payload, expiresIn = "1h") {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    throw new Error("Error creating token: " + error.message);
  }
}

// Function to verify a JWT token
/**
 * The function `verifyToken` decodes a token using a secret key and throws an error if verification
 * fails.
 * @param token - The `token` parameter is the token that needs to be verified. It is typically a
 * string containing encoded information that needs to be decoded and verified using a secret key.
 * @returns The function `verifyToken` is returning the decoded token if it is successfully verified
 * using the `jwt.verify` method. If there is an error during verification, it will throw a new Error
 * with a message indicating the error that occurred.
 */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Error verifying token: " + error.message);
  }
}

module.exports = { encryptPassword, verifyPassword, createToken, verifyToken };
