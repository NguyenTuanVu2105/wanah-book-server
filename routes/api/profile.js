const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// get User profile

router.get('/profile', passport.authenticate('jwt', { session: false }),(req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).populate('user', ['first_name', 'last_name']).then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    }).catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// get User profile by id

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id }).populate().then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    }).catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// update and create profile user

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.first_name) profileFields.first_name = req.body.first_name;
    if (req.body.last_name) profileFields.last_name = req.body.last_name;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.district) profileFields.district = req.body.district;
    if (req.body.street) profileFields.street = req.body.street;
    if (req.body.detail) profileFields.detail = req.body.detail;

    Profile.findOne({ user: req.user.id }).then(profile => {
        if (!profile) {
            new Profile(profileFields).save().then(profile => res.json(profile));
        } else {
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, useFindAndModify: false }
            ).then((profile) => res.json(profile));
        } 
    });
});

module.exports = router;