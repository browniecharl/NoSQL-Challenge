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
        Thought.findOne ({ _id: params.thoughtId })
        .then(dbThoughtData => res.json (dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addThought ({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate (
                { _id: params.userId },
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
        Thought.findByIdAndUpdate ({ _id: params.thoughtId }, body, { runValidators: true, new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user has been found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    
}