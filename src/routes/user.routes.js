import { Router } from "express";
import { UserController } from "../modules/users/user.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { validateCreateUserDto } from "../middlewares/users/validateCreateUserRequest.middleware.js";
import { validateUpdateUserDto } from "../middlewares/users/validateUpdateUserRequest.middleware.js";

const router = new Router();
const userController = new UserController();

router.post('/', validate(validateCreateUserDto), userController.createUser);
router.get('/', userController.getUserByEmail);
router.get('/:id', userController.getUserByUserId);
router.patch('/:id', validate(validateUpdateUserDto), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;