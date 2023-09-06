import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.post('/logout', logout);

export default route;
