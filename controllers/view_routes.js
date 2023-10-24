// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');
const Goal = require('../models/Goal');


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


  // login page
router.get('/login', isLoggedIn, authenticate, (req, res) => {
    // Render the register form template
    res.render('login', {
      errors: req.session.errors,
      user: req.user
    });
    req.session.errors = [];
  });


router.get('/goals_form', isAuthenticated, authenticate, (req, res) => {
    res.render('goals_form', {
      user: req.user
    });
  
    req.session.errors = [];
  });

  // View Goal Page
router.get('/goals', isAuthenticated, authenticate, async (req, res) => {
  const userId = req.user.id; // Get the current user's ID

  const goals = await Goal.findAll({
    where: { author_id: userId }, // Use the actual column name that links goals to users
    include: {
      model: User,
      as: 'author'
      
    }
  });

  res.render('goals', {
    user: req.user,
    goals: goals.map(p => p.get({ plain: true }))
  });
});

 


// Export the router
module.exports = router;