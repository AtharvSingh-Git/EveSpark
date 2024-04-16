import express from "express";
import {Login, logOut, getCurrentUserInfo} from "../controllers/Auth.js";

const router = express.Router();

router.get('/fetchUser', getCurrentUserInfo);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;
