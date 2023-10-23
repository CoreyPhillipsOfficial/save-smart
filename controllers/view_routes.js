const router = require('express').Router();

const User = require('../models/User');


// block an auth page if user is already logged in
function isLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/')
  }

  next();
}

// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login')
  }

  next();
}

// attach user data to the request if they are logged in
async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if (user_id) {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['id', 'username']
    });

    req.user = user.get({ plain: true });

  }

  next();

};

// landing page
router.get('/', authenticate, async (req, res) => {
  
  res.render('landing'); 
});

// Export the router
module.exports = router;