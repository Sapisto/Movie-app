import express, { Request, Response, NextFunction } from "express";

import { Register, Login, Logout } from "../controller/userController";

/* GET home page */

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
//router.get("/get-user", getUserAndMovies);

export default router;
