const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.loggedIn = req.session && req.session.userId
    next();
});
module.exports = router;
