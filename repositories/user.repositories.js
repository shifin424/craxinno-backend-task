import User from '../models/user.model.js';
import { hashPassword, comparePasswords } from '../services/bycrpt.services.js';


class UserRepository {

    async checkUserExists(email) {
        try {
            const admin = await User.findOne({ email });
            return admin !== null;
        } catch (error) {
            throw new Error('Error checking admin existence');
        }
    }

    async checkMobileExists(mobile) {
        try {
            const user = await User.findOne({ mobile });
            return user !== null;
        } catch (error) {
            throw new Error('Error checking mobile existence');
        }
    }

    async createUser(userData) {
        try {
            const hashedPassword = await hashPassword(userData.password);
            const user = new User({
                email: userData.email,
                mobile: userData.mobile,
                password: hashedPassword,
            });
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async authenticateUser(email, password) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await comparePasswords(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }

            return user;
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    }

    async findById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw new Error('Error finding user by ID');
        }
    }

    async save(user) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error('Error saving user');
        }
    }
}

export default UserRepository;
