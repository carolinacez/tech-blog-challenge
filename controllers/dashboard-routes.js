const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      userId: req.session.userId
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true }); /////
    })
    .catch(err => {
      console.log(err);
      res.redirect('login');
    });
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { layout: 'new-post' });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { layout: 'edit-post', post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

module.exports = router;
