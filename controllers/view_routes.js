// Create an express router instance object
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
  
  res.render('landing', {user: req.user}); 
});


// GET route to show the register form
router.get('/register', isLoggedIn, authenticate, (req, res) => {
    // Render the register form template
    res.render('register', {
      errors: req.session.errors,
      user: req.user
    });
    req.session.errors = [];
  });


  // GET route to show the login form
router.get('/login', isLoggedIn, authenticate, (req, res) => {
    // Render the register form template
    res.render('login', {
      errors: req.session.errors,
      user: req.user
    });
    req.session.errors = [];
  });

//   // Show Goals Page
// router.get('/', isAuthenticated, authenticate, (req, res) => {
//   res.render('goals_form', {
//     user: req.user
//   });

//   req.session.errors = [];
// });

// Export the router
module.exports = router;