const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');
  
  router.post('/create_blog', async (req, res, next) => {
    console.log(req.body);
    const {title, content} = req.body;
    const id= req.user.id;
    try {
      const blogPost = await Blog.create({title, content, authorDetail: id});
      console.log(blogPost);
      res.json({blogPost});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });
  
  router.get('/get_your_blogs', async (req, res, next) => {
    try {
      const id = req.user.id;
      const blogPosts = await Blog.find({authorDetail:id}).populate('authorDetail', '-email -password');
      res.json({blogPosts});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });


  router.get('/get_all_blogs', async (req, res, next) => {
    try {
      const blogPosts = await Blog.find({}).populate('authorDetail', '-email -password');
      res.json({blogPosts});
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });

  module.exports = router;