// Get route that res.render's the landing.hbs

// Target your '/'

const router = require("express").Router();
// const User = require("../models/User");
// const gaols = require("../models/goals"); 




// Block an auth page if user is already logged in
// function isLoggedIn(req, res, next) {
//     if (req.session.user_id) {
//       return res.redirect('/');
//     }
  
//     next();
//   }
 

// Block a route if a user is not logged in
// function isAuthenticated(req, res, next) {
//     if (!req.session.user_id) {
//       return res.redirect('/login');
//     }
  
//     next();
//   }


// Attach user data to the request if they are logged in
// async function authenticate(req, res, next) {
//     const user_id = req.session.user_id;
  
//     if (user_id) {
//       const user = await User.findByPk(req.session.user_id, {
//         attributes: ['id', 'email']
//       });
  
//       req.user = user.get({ plain: true });
//     }
  
//     next();
//   }


// Add one test GET route at root - localhost:3333/
// router.get('/', authenticate, async (req, res) => {
//     const coos = await User_gaols.findAll({
//       include: {
//         model: User,
//         as: 'author'
//       }
//     });
  
//     res.render('landing', {
//       user: req.user,
//       coos: coos.map(c => c.get({ plain: true }))
//     });
//   });



// get route to show the register form
// router.get('/register', isLoggedIn, authenticate, (req, res) => {
//     // Render the register form template
//     res.render('register_form', {
//       errors: req.session.errors,
//       user: req.user
//     });
  
//     req.session.errors = [];
//   });
  
  

// get route to show the login form
// router.get('/login', isLoggedIn, authenticate, (req, res) => {
//     // Render the register form template
//     res.render('login_form', {
//       errors: req.session.errors,
//       user: req.user
//     });
  
//     req.session.errors = [];
//   });




// get route to show the goals page
// router.get('/goals', isAuthenticated, authenticate, (req, res) => {
//     res.render('goals_form', {
//       user: req.user
//     });
  
//     req.session.errors = [];
//   });
  
router.get("/", (req, res) => {
  res.render("landing")
})

router.get("/auth/register", (req,res) => {
  res.render("register")
})

router.get("/auth/login", (req,res) => {
  res.render("login")
})


// export the router
module.exports = router;