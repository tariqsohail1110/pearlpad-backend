import { UserService } from "./user.service.js";
import { UserResponseDto } from "./dtos/userResponse.dto.js";

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req, res) => {
        try {
            const data = req.body;
            const user = await this.userService.createUser(data);
            res.status(201).json({ data: UserResponseDto(user) });
        } catch (error) {
            const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 400;
            res.status(statusCode).json({ message: error.message });
        };
    };

    getUserByUserId = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserByUserId(id);
            res.status(200).json({ data: UserResponseDto(user) });
        } catch (error) {
            const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 400;
            res.status(statusCode).json({ message: error.message });
        };
    };

    getUserByEmail = async (req, res) => {
        try {
            const { email } = req.query;
            const user = await this.userService.getUserByEmail(email);
            res.status(200).json({ data: UserResponseDto(user) });
        } catch (error) {
            const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 400;
            res.status(statusCode).json({ message: error.message });
        };
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedUser = await this.userService.updateUser(id, data);
            res.status(201).json({ data: UserResponseDto(updatedUser) });
        } catch(error) {
            const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 400;
            res.status(statusCode).json({ message: error.message });
        };
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(200).json({ message: 'User Deleted Successfully!' });
        } catch (error) {
            const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 400;
            res.status(statusCode).json({ message: error.message });
        };
    };
};