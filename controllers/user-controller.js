const { User } = require('../models');

module.exports = {
    // get all user
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error('Error fetching all users:', err);
            res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
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
            console.error(`Error fetching user with ID ${req.params.userId}:`, err);
            res.status(500).json({ message: 'Failed to retrieve user', error: err.message });
        }
    },
    // create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Failed to create user', error: err.message });
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(`Error updating user with ID ${req.params.userId}:`, err);
            res.status(500).json({ message: 'Failed to update user', error: err.message });
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
            console.error(`Error deleting user with ID ${req.params.userId}:`, err);
            res.status(500).json({ message: 'Failed to delete user', error: err.message });
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
            console.error(`Error adding friend to user with ID ${req.params.userId}:`, err);
            res.status(500).json({ message: 'Failed to add friend', error: err.message });
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
            res.json({ message: 'Friend removed successfully!', user });
        } catch (err) {
            console.error(`Error removing friend from user with ID ${req.params.userId}:`, err);
            res.status(500).json({ message: 'Failed to remove friend', error: err.message });
        }
    },
};