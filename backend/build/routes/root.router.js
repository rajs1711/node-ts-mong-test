import express from 'express';
import userroutes from './userrouter.route.js';
const rootrouter = express.Router();
//user routes
rootrouter.use(userroutes);
export default rootrouter;
