const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');


exports.renderLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};


exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};


exports.renderRegister = (req, res) => {
    res.render('auth/register', { title: 'Register' });
};


exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
};


exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};