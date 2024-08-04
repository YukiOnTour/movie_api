// auth.js
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = (app) => {
    app.post('/auth/login', (req, res, next) => {
        console.log('Login attempt:', req.body);
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                console.error('Error during authentication:', err);
                return res.status(400).json({
                    message: 'Something is not right',
                    error: err
                });
            }
            if (!user) {
                console.error('User not found or incorrect password');
                return res.status(400).json({
                    message: 'Something is not right',
                    info: info
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    console.error('Error during login:', err);
                    return res.status(400).json({
                        message: 'Something is not right',
                        error: err
                    });
                }
                const token = jwt.sign({ id: user._id }, 'your_jwt_secret'); // Replace with your secret key
                console.log('Login successful, token:', token);
                return res.json({ user, token });
            });
        })(req, res, next);
    });
};
