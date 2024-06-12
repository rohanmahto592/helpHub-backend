const User = require('../models/user/userSchema');
const { encryptPassword, verifyPassword, createToken, verifyToken } = require('../helper');
exports.registerUser = async (req, res) => {
    const { name, email, password, skills, location } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      const hashedPassword = await encryptPassword(password);
      user = new User({ name, email,  password: hashedPassword, skills, location });

      await user.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
 exports.loginUser = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          // Check if user exists
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
          }
      
          // Check password
          const isMatch = await verifyPassword(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
          }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
        };

exports.getUserById = async (req, res) => {
            try {
              const user = await User.findById(req.params.id).select('-password');
              if (!user) {
                return res.status(404).json({ msg: 'User not found' });
              }
              res.json(user);
            } catch (err) {
              console.error(err.message);
              res.status(500).send('Server Error');
            }
          };
exports.updateUser = async (req, res) => {
            const { name, email, phoneNumber, profileUrl, currentLocation, isHelper } = req.body;
          
            // Build user object
            const userFields = {};
            if (name) userFields.name = name;
            if (email) userFields.email = email;
            if (phoneNumber) userFields.phoneNumber = phoneNumber;
            if (profileUrl) userFields.profileUrl = profileUrl;
            if (currentLocation) userFields.currentLocation = currentLocation;
            if (isHelper !== undefined) userFields.isHelper = isHelper;
          
            try {
              let user = await User.findById(req.params.id);
          
              if (!user) {
                return res.status(404).json({ msg: 'User not found' });
              }
          
              user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: userFields },
                { new: true }
              );
          
              res.json(user);
            } catch (err) {
              console.error(err.message);
              res.status(500).send('Server Error');
            }
          };
exports.deleteUser = async (req, res) => {
            try {
              const user = await User.findById(req.params.id);
          
              if (!user) {
                return res.status(404).json({ msg: 'User not found' });
              }
          
              await user.remove();
              res.json({ msg: 'User removed' });
            } catch (err) {
              console.error(err.message);
              res.status(500).send('Server Error');
            }
          };