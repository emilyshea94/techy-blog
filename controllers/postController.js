const Post = require('../models/post');
const Comment = require('../models/comment');


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('posts/index', { title: 'All Posts', posts });
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
};


exports.renderNewPostForm = (req, res) => {
    res.render('posts/new', { title: 'New Post' });
};


exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Post.create({ title, content, userId: req.user.id });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findByPk(postId, {
            include: [{ model: Comment }]
        });
        res.render('posts/show', { title: 'Post Detail', post });
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
};


exports.addComment = async (req, res) => {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user.id; 

    try {
        const comment = await Comment.create({
            postId,
            userId,
            text
        });
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
};