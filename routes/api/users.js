const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {

            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash( newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        
        if (!user) {
            errors.email = 'User not found';
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                const payload = { id: user.id, first_name: user.first_name, last_name: user.last_name };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: token});
                });
            }
        });
    });
});

router.get('/information', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        first_name: req.user.first_name,
        last_name: req.user.last_name
    });
});

module.exports = router;