const Comment = require('../models/comment');


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