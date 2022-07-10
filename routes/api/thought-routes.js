const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
.get(getAllThoughts);

router.route('/:userID')
.post(createThought);

router.route('/:thoughtID')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtID/reactions')
.post(addReaction);

router.route('/thoughtID/reactions/:reactionID')
.delete(deleteReaction);

module.exports = router;