var express = require('express');
var router = express.Router();
const { register, login } = require('../controllers/auth');
const { check } = require('../auth-middlewares/checkIfLoggedIn');
const { postSchema } = require('../model/post');
const { authorize } = require('../auth-middlewares/authorize');
const { checkStaff } = require('../auth-middlewares/checkrole');

/* GET home page. */
router.post('/', register);

router.post('/login', login);

router.get('/general', function(req, res){
  res.send("Anyone can access this route");
});



router.get('/staff', check, checkStaff, function(req, res){
  res.send("You're a staff");
});

router.get('/restricted', check, function(req, res){
  res.send("This route is restricted for only logged in users");
});

router.post('/makepost', check, async function(req, res) {
  const { post } = req.body;
  const newPost = new postSchema({
    userID: req.decoded,
    post
  });

  const newOriginalpost = await newPost.save();
  res.json({
    successful: true,
    newPost: newOriginalpost
  });
});

router.delete('/post/:id', check, authorize, function(req, res) {
  const postID = req.params.id;
  postSchema.findByIdAndDelete(postID, '', function(err, deletedPost) {
    if(err) console.log();
    res.json({
      successful: true,
      message: "Deleted successfully",
      deletedPost
    });
  });
  
});




module.exports = router;
