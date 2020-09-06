const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
   include: [User]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('all-posts', {
        loggedIn: req.session && req.session.userId,
        posts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      User, 
      {
        model: Comment, 
        include: [User],
      },
    ],
  })
  .then((dbPostData) => {
    if (dbPostData) {
      const post = dbPostData.get ({plan:true});
      res.render('single-post', {post});
    } else {
      res.status(404);
    }
})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
res.render('signup');
});

module.exports = router;
