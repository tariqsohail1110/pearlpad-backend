import { UserService } from "./user.service.js";
import { UserResponseDto } from "./dtos/userResponse.dto.js";
import { logger } from "../../config/pinoLogger.js";

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req, res, next) => {
        try {
            logger.info('User registration started');
            const data = req.body;
            const user = await this.userService.createUser(data);
            logger.info({ userId: user.id, email: user.email}, 'User registered successfully')
            res.status(201).json({ data: UserResponseDto(user) });
        } catch (error) {
            next(error);
        };
    };

    getUserByUserId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserByUserId(id);
            res.status(200).json({ data: UserResponseDto(user) });
        } catch (error) {
            next(error);
        };
    };

    getUserByEmail = async (req, res, next) => {
        try {
            const { email } = req.query;
            const user = await this.userService.getUserByEmail(email);
            res.status(200).json({ data: UserResponseDto(user) });
        } catch (error) {
            next(error);
        };
    };

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedUser = await this.userService.updateUser(id, data);
            res.status(201).json({ data: UserResponseDto(updatedUser) });
        } catch(error) {
            next(error);
        };
    };

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(200).json({ message: 'User Deleted Successfully!' });
        } catch (error) {
            next(error);
        };
    };
};