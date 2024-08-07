const express = require("express");
const blogController = require("../controllers/blogController.js");
const { verify, verifyAdmin } = require("../auth.js");
const router = express.Router();

router.get('/getBlogs', blogController.getAllBlogs);

router.get('/getBlogs/:blogid', blogController.getBlogById);

router.get('/getComments/:blogid', verify, blogController.getBlogComments);

router.post('/addBlog', verify, blogController.addBlog);

router.post('/addComment/:blogid', verify, blogController.addBlogComment);

router.patch('/updateBlog/:blogid', verify, blogController.updateBlog);

router.delete('/deleteBlog/:blogid', verify, blogController.deleteBlog);

router.delete('/deleteBlogComment/:blogid/:commentid', verify, verifyAdmin, blogController.deleteBlogComment);


module.exports = router;