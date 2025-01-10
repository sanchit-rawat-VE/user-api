import db from "../config/db.js";

const dbQuery = async (query, params) => {
    try {
        return await db.query(query, params);
    } catch (error) {
        throw new Error('Database query failed');
    }
};

export const userService = {
    async addUser(userData) {
        try {
            const { name, email, contact_no, postalcode } = userData;

            if (!validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            const query = 'INSERT INTO users (name, email, contact_no, postalcode) VALUES (?, ?, ?, ?)';
            const result = await dbQuery(query, [name, email, contact_no, postalcode]);
            return result;
        } catch (error) {
            throw new Error('Failed to add user');
        }
    },

    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const results = await dbQuery(query);
            return results;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    },

    async updateUser(id, userData) {
        try {
            const { name, email, contact_no, postalcode } = userData;

            if (!validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            const query = 'UPDATE users SET name = ?, email = ?, contact_no = ?, postalcode = ? WHERE id = ?';
            const result = await dbQuery(query, [name, email, contact_no, postalcode, id]);

            if (result.affectedRows > 0) {
                return { success: true, message: 'User updated successfully' };
            } else {
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            throw new Error('Failed to update user');
        }
    },

    async deleteUser(id) {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const result = await dbQuery(query, [id]);

            if (result.affectedRows > 0) {
                return { success: true, message: 'User deleted successfully' };
            } else {
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    },
};

function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}
