import express from "express";

import userController from "../controllers/user_controller";
import roleController from "../controllers/role_controller";
import authController from "../controllers/auth_controller";

const router = express.Router();

router.route('/login').post(authController.login)
router.route('/confirm/:token').get(authController.confirm)
router.route('/confirm/:token').post(authController.confirm)
//router.route('/confirm').post(authController.confirm)

router.route('/user')
    .get(userController.getUser)
    .post(userController.postUser)

router.route('/role')
    .get(roleController.getRole)
    .post(roleController.postRole)

export default  router;