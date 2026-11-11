import { UserRepository } from "./user.repository.js";
import { HashingService } from "../../common/hashing/hashing.service.js";
import { validateIntegerValues } from '../../common/errors/validateIntegerValues.error.js'
import { notExists } from "../../common/errors/notExists.error.js";
import { notFound } from "../../common/errors/notFound.errors.js";

export class UserService {
    constructor() {
        this.userRepository  = new UserRepository();
        this.hashingService = new HashingService();
    };

    async createUser(data) {
        try {
            const { first_name, last_name, email, password } = data;
            const existingUser = await this.getUserByEmail(email);
            
            if (existingUser) {
                throw new Error('Email Already Exists');
            }
            const hashedPass = await this.hashingService.hashPassword(password);
            const user = await this.userRepository.createUser({
                first_name, last_name, email, password: hashedPass
            });
            const { password: _, is_active, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        };
    };

    async getUserByUserId(userId) {
        try {
            const parseId = Number(userId);
            validateIntegerValues(parseId, 'User ID');
            const user = await this.userRepository.getUserByUserId(parseId);
            return notExists(user, "User");
        } catch (error) {
            throw error;
        };
    };

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            return notExists(user, "User");
        } catch (error) {
            
        };
    };

    async updateUser(userId, data) {
        try {
            const parseId = Number(userId);
            validateIntegerValues(parseId, "User ID");
            const user = await this.userRepository.getUserByUserId(parseId);
            notFound(user, "User");
            const updatedData = { ...data };
            if(updatedData.password) {
                updatedData.password = await this.hashingService.hashPassword(updatedData.password);
            };
            const updatedUser = await this.userRepository.updateUser(parseId, updatedData);
            const { password: _, is_active, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        };
    };

    async deleteUser(userId) {
        try {
            const parseId = Number(userId);
            validateIntegerValues(parseId,'User ID');
            const user = await this.userRepository.getUserByUserId(parseId);
            notFound(user, 'User');
            await this.userRepository.deleteUser(parseId);
        } catch (error) {
            throw error;
        };
    };

    async updateUserPassword(userId, password) {
        try {
            const parseId = Number(userId);
            validateIntegerValues(parseId, 'User ID');
            const user = await this.userRepository.getUserByUserId(parseId);
            notFound(user, "User");
            const hashedPass = await this.hashingService.hashPassword(password);
            await this.userRepository.updatePassword(parseId, hashedPass);
            return { message: 'Password updated successfully' };
        } catch (error) {
            throw error;
        };
    };
};