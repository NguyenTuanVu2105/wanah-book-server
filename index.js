const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
console.log(require('./config/keys'))
const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(db, config).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api', users);
app.use('/api', profile);

// app.use('/', (req, res) => {
//     res.send("Hello world!!");
// });
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));