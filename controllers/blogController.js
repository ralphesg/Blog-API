const User = require("../models/User.js");
const Blog = require("../models/Blog.js");
const auth = require("../auth.js");
const mongoose = require("mongoose");
const { errorHandler } = auth;


module.exports.addBlog = async (req, res) => {

  const userId = req.user.id;
  const username = req.user.username

  console.log(username)

  const { title, content, description } = req.body;

  if (!title || !content || !description) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  const newBlog = new Blog({
    userId: userId,
    title,
    content,
    author: username,
    description
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).send( savedBlog );
  } catch (error) {
    res.status(500).send({ message: 'Error adding Blog', error });
  }
};



module.exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogid;
        const userId = req.user.id; 

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send({ message: "Blog post not found" });
        }

        if (blog.userId.toString() !== userId) {
            return res.status(403).send({ message: "You are not authorized to update this blog post" });
        }

        const blogUpdate = {
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
        };

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogUpdate, {
            new: true,
        });

        res.status(200).send({
            message: "Blog post updated successfully",
            updatedBlog,
        });
    } catch (error) {
        errorHandler({ message: error, req, res });
    }
};


module.exports.deleteBlog = async (req, res) => {
  const blogId = req.params.blogid;
  const userId = req.user.id; 
  const isAdmin = req.user.isAdmin; 

  console.log(isAdmin)

  try {

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (blog.userId.toString() !== userId && isAdmin !== true) {
      return res.status(403).json({ message: 'You are not authorized to delete this blog post' });
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports.getAllBlogs = (req, res) => {

    return Blog.find({})
    .then(result => {
    
        if(result.length > 0){
            return res.status(200).send({blogs: result});
        }
        else{
            return res.status(404).send({message: 'No blog found'});
        }
    })
    .catch(error => errorHandler(error, req, res));

};

module.exports.getBlogById = (req, res) => {

    Blog.findById(req.params.blogid)
    .then(result => res.send(result))
    .catch(err => errorHandler(err, req, res));
};

module.exports.addBlogComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username 
    const { comment } = req.body; 
    const blogId = req.params.blogid; 

    if (!userId || !comment) { 
      return res.status(400).json({ message: 'User ID and comment text are required' });
    }

    const blog = await Blog.findById(blogId); 

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.comments.push({ userId, username, comment });

    await blog.save();

    res.status(200).send({
      message: "comment added successfully",
      updatedBlog: blog
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.getBlogComments = async (req, res) => {

    try {
        const blogId = req.params.blogid;

        const blog = await Blog.findById(blogId).select('comments');

        console.log(blogId)
        console.log(blog)

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({comments: blog.comments});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.deleteBlogComment = async (req, res) => {
    try {
        const blogId = req.params.blogid;
        const commentId = req.params.commentid;

        if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid Blog ID or comment ID format' });
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        blog.comments.splice(commentIndex, 1);

        await blog.save();

        res.status(200).send({
            message: 'Comment deleted successfully',
            updatedBlog: blog
        });

    } catch (error) {
        console.error('Error deleting blog comment:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};