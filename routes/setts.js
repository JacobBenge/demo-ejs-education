const express = require('express');
const router = express.Router({ mergeParams: true }); // MERGE PARAMS ALLOWS THIS ROUTER TO ACCESS PARAMETERS THAT ARE EARLIER IN THE URL (SUCH AS THE ID). WITHOUT THIS WE CANNOT ACCESS THE ID IN THE URL 
const catchAsync = require('../utils/catchAsync');
const { isAuthenticated, isAdmin, validateSett } = require('../middleware/middleware');
const settsController = require('../controllers/setts');

// ADDS req.flash(flashMessage) TO EVERY ROUTE. IF A flashMessage EXISTS, THEN IT WILL DISPLAY AT THE TOP OF THE PAGE
router.get((req, res, next) => {
    res.locals.success = req.flash(sucess);
    next();
})

router.route('/')
    // ROUTES USER TO INDEX PAGE FOR SET. LOADS ALL SET FROM DB AND LISTS THEM.
    .get(isAuthenticated, isAdmin, catchAsync(settsController.index))
    // ADDS A NEW SET TO DB
    .post(isAuthenticated, isAdmin, validateSett, catchAsync(settsController.createSett))

// ROUTES USER TO NEW SET PAGE
router.get('/new', isAuthenticated, isAdmin, settsController.renderSettNew)

router.route('/:id')
    // ROUTES USER TO SET DETAILS (SHOW) PAGE
    .get(isAuthenticated, isAdmin, catchAsync(settsController.renderSettShow))
    // APPLIES UPDATES TO THE SET INFO
    .put(isAuthenticated, isAdmin, validateSett, catchAsync(settsController.updateSett))
    // TRIGGERED BY DELETE BUTTON ON SET. DELETES THE SET AND RELATED NOTES
    .delete(isAuthenticated, isAdmin, catchAsync(settsController.deleteSett))

// ROUTES USER TO SET EDIT PAGE
router.get('/:id/edit', isAuthenticated, isAdmin, catchAsync(settsController.renderSettEdit))

module.exports = router;