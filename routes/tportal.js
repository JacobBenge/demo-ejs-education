const express = require('express');
const router = express.Router({ mergeParams: true }); // MERGE PARAMS ALLOWS THIS ROUTER TO ACCESS PARAMETERS THAT ARE EARLIER IN THE URL (SUCH AS THE ID). WITHOUT THIS WE CANNOT ACCESS THE ID IN THE URL 
const { isAuthenticated, isAdmin } = require('../middleware/middleware');
const Sett = require('../models/sett');

// ADDS req.flash(flashMessage) TO EVERY ROUTE. IF A flashMessage EXISTS, THEN IT WILL DISPLAY AT THE TOP OF THE PAGE
router.get((req, res, next) => {
    res.locals.success = req.flash(sucess);
    next();
})

// RENDER THE TPORTAL PAGE
router.get('/', isAuthenticated, isAdmin, async(req, res) => {
    const settings = await Sett.findOne();
    res.render('tportal', { settings })
})

module.exports = router;