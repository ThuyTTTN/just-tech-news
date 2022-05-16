const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", "title", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            attributes: [
              "id",
              "post_url",
              "title",
              "created_at",
              [
                sequelize.literal(
                  "(SELECT COUNT(*) FROM voite WHERE post.id = vote.post.id"
                ),
                "vote_count",
              ],
            ],
          },
        ],
      })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {

});

module.exports = router;