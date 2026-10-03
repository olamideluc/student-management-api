const router = require('express').Router();
const passport = require('passport');

router.get(
    '/login',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/profile');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    res.json(req.user);
});

module.exports = router;
