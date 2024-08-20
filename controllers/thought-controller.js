const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get one thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            } 
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new thought associated to user
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id:req.params.thoughtId });
            res.status(200).json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true
            });

            if(!thought) {
                res.status(400).json({ message: 'Thought not found' });
            } 
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body }},
                { runValidators: true, new: true }
            );

            thought ? res.json(thought) : res.status(404).json({ message: notFound });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId} }},
                { runValidators: true, new: true }
            );

            thought ? res.json({ message: 'Reaction successfully deleted' }) : res.status(404).json({ message: notFound });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};