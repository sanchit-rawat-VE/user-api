import { userService } from '../services/userService.js';

export const userController = {
    async addUser(req, res) {
        try {
            const user = await userService.addUser(req.body);
            res.status(201).json({ success: true, message: 'User added successfully', userId: user.data });
        } catch (error) {
            console.error('Error adding user:', error.message);
            res.status(500).json({ success: false, message: error.message || 'Error adding user' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            console.error('Error fetching users:', error.message);
            res.status(500).json({ success: false, message: error.message || 'Error fetching users' });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateResponse = await userService.updateUser(id, req.body);

            if (!updateResponse.success) {
                return res.status(404).json({ success: false, message: updateResponse.message });
            }
            res.status(200).json({ success: true, message: updateResponse.message });
        } catch (error) {
            console.error('Error updating user:', error.message);
            res.status(500).json({ success: false, message: error.message || 'Error updating user' });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleteResponse = await userService.deleteUser(id);

            if (!deleteResponse.success) {
                return res.status(404).json({ success: false, message: deleteResponse.message });
            }
            res.status(200).json({ success: true, message: deleteResponse.message });
        } catch (error) {
            console.error('Error deleting user:', error.message);
            res.status(500).json({ success: false, message: error.message || 'Error deleting user' });
        }
    },
};
