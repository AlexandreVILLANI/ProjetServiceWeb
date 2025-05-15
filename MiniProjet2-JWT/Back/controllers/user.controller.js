const db = require('../models');
const User = db.user;

exports.getUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'firstName', 'lastName', 'emailId']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailId
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};