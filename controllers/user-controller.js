const { User } = require('../models/User');

module.exports = {
    // get all user
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } 
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(req.params.userId, req.body, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId }},
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found '});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove friend from user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const removed = !user.friends.includes(req.params.friendId);
            if (removed) {
                res.json({ message: 'Friend removed successfully!', user });
            } else {
                res.json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};