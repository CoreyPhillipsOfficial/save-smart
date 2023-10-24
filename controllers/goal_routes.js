const router = require('express').Router();

const User = require('../models/User');
const Goal = require('../models/Goal');

// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if(!req.session.user_id){
    return res.redirect('/login')
  }

  next();
};

async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if(user_id){
    const user = await User.findByPk(req.session.user_id);

    req.user = user;

  }

  next();
  
};



// Post a post
router.post('/goals', isAuthenticated, authenticate, async (req, res) => {

  try {
    const balance = req.body.goalAmount - req.body.currentAmount;
    

    req.body.balance = balance;
  const goal = await Goal.create(req.body);
  
  await req.user.addGoal(goal);

  res.redirect('/goals');
  console.log(balance);
  } catch (error) {
   
    req.session.errors = error.errors.map(errObj => errObj.message);
    res.redirect('/goals');
  }
  })







// Edit a post
router.get('/editBalance/:goalId', isAuthenticated, authenticate, async (req, res) => {
  const goalId = req.params.goalId;
  const userId = req.user.id; // Get the current user's ID

  // Find the specific post that matches the provided postId and belongs to the current user
  const goal = await Goal.findOne({
    where: { id: goalId, author_id: userId },
    include: {
      model: User,
      as: 'author'
    }
  });

  if (goal) {
    res.render('editBalance', {
      user: req.user,
      goal: goal.get({ plain: true })
    });
  } else {
    // Handle the case where the post doesn't exist or doesn't belong to the user
    res.status(404).send("Post not found or unauthorized to edit.");
  }
});

// Update a goal balance (POST)
router.put('/updateBalance/:goalId', isAuthenticated, authenticate, async (req, res) => {
  const goalId = req.params.goalId;
  const userId = req.user.id;
  const addMoney = req.body;

  // Verify that the goal belongs to the user before updating
  const goal = await Goal.findOne({
    where: { id: goalId, author_id: userId }
  });

  if (goal) {
    // Update the goal
    newBalance = balance + addMoney;
    await post.update({balance: newBalance});

    // Redirect to a different page or send a response as needed
    res.redirect('/');
  } else {
    res.status(404).send("Post not found or unauthorized to edit.");
  }
});


// router.delete('/deleteGoal/:goalId', isAuthenticated, authenticate, async (req, res) => {
//   const goalId = req.params.goaltId;
//   const userId = req.user.id;

//   // Verify that the goal belongs to the user before deleting
//   const goal = await Goal.findOne({
//     where: { id: goalId, author_id: userId }
//   });

//   if (goal) {
//     // Delete the goal
//     await goal.destroy();

//     // Redirect to a different page or send a response as needed
//     res.redirect('/dashboard');
//   } else {
//     res.status(404).send("Goal not found or unauthorized to delete.");
//   }
// });





module.exports = router;