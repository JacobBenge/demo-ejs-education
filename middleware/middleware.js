const ExpressError = require('../utils/ExpressError');
const { studentSchema, noteSchema, homeworkSchema, settSchema } = require('../schemas.js');
const Sett = require('../models/sett');

// CHECKS TO SEE IF USER IS LOGGED IN
module.exports.isAuthenticated = async(req, res, next) => {
    const settings = await Sett.findOne();
    if (!req.isAuthenticated()) { //isAuthenticated IS A PASSPORT FUNCTION
        req.session.returnTo = req.originalUrl; // SAVES THE ORIGINAL URL SO THAT WE CAN RETURN THE USER BACK TO THE PAGE THEY CAME FROM BEFORE HITTING THE LOGIN ROUTE.
        req.flash('error', 'You must first sign in before you can view that page');
        return res.redirect('/login', { settings }); // SINCE THE USER IS NOT LOGGED IN, SENT THEM TO THE LOGIN PAGE
    }
    next();
}

module.exports.isAdmin = async(req, res, next) => {
    const settings = await Sett.findOne();
    if(!req.user.isAdmin){
        req.flash('error', 'Only admins can view that page')
        return res.redirect('/', { settings });
    }
    next();
}

// CHECKS TO SEE IF FORM INPUT MEETS SCHEMA CRITERIA, OTHERWISE THROWS ERROR.
module.exports.validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// CHECKS TO SEE IF FORM INPUT MEETS SCHEMA CRITERIA, OTHERWISE THROWS ERROR.
module.exports.validateHomework = (req, res, next) => {
    const { error } = homeworkSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// CHECKS TO SEE IF FORM INPUT MEETS SCHEMA CRITERIA, OTHERWISE THROWS ERROR.
module.exports.validateNote = (req, res, next) => {
    const { error } = noteSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// CHECKS TO SEE IF FORM INPUT MEETS SCHEMA CRITERIA, OTHERWISE THROWS ERROR.
module.exports.validateSett = (req, res, next) => {
    const { error } = settSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}