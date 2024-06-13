import express from 'express';
import userController from '../controllers/users.controller';
const userroutes = express.Router();
userroutes.route('/users').get(userController.getUser);
export default userroutes;
