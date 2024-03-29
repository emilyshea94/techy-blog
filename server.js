const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/', authRoutes);
app.use('/posts', postRoutes);

// Database connection using Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('techy_blog', 'root', 'sage123', {
    host: 'localhost',
    dialect: 'mysql'
});

// Passport local strategy setup
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch(err => done(err));
}));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => done(err));
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






