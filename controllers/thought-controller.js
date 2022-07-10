const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts (req, res) {
        Thought.find({})
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById ({ params }, res) {
        Thought.findOne ({ _id: params.thoughtID })
        .then(dbThoughtData => res.json (dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought ({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate (
                { _id: params.userID },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Please check that thought data was entered correctly'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    updateThought ({ params, body }, res) {
        Thought.findByIdAndUpdate ({ _id: params.thoughtID }, body, { runValidators: true, new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought has been found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteThought ({ params }, res) {
        Thought.findByIdAndDelete ({ _id: params.thoughtID })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate (
            { _id: params.thoughtID },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Reaction data has been entered incorrectly'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
           { _id: params.id },
           { $pull: { reactionID:  params.reactionID} } ,
           { new: true }
         )
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.json(err));
       }
}

module.exports = thoughtController;