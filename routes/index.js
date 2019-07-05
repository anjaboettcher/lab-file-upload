const express = require('express');
const multer = require('multer');
const User = require('../models/User')
const Post = require('../models/Post')
const router  = express.Router();
const upload = multer({ dest: './public/uploads/' });


router.get("/index", (req, res, next) => {
  Post.find({}).then(posts => {
    res.render("index", {
      posts: posts
    });
  });
});

router.get('/profile/:userId', function(req, res, next) {
  User.find((err, picture) => {
    res.render("profile", {user: req.user})
  })
});

// router.get('/profile/:userId', (req, res, next) => {
//   let userId = req.params.userId
//   User.findById(userId)
//     .then(user => {
//       res.render("profile", { user, picPath });
//     })
// });

router.get('/add-post', (req,res,next)=>{
  res.render('add-post')
})

router.post('/add-post', upload.single('photo'), (req, res) => {
  console.log("TCL", req.file)
  Post.create({
    picPath: req.file.picPath,
    content: req.body.content,
    _creator: req.user._id,
    date: req.body.date
  })
  .then(postCreated =>{
    console.log(postCreated)
    res.redirect("/index");
  })
});


module.exports = router;