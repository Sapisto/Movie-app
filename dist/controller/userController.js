"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const Register = async (req, res) => {
    try {
        const { email, firstName, lastName, userName, password, confirm_password } = req.body;
        const validationResult = utils_1.registerUserSchema.validate(req.body);
        if (validationResult.error) {
            return res.render("Register", {
                error: validationResult.error.details[0].message,
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const existingUser = await userModel_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.render("Register", { error: "Email already exists" });
        }
        const newUser = await userModel_1.UserModel.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });
        const user = await userModel_1.UserModel.findOne({ email });
        if (!user) {
            return res.render("Register", { error: "User not found" });
        }
        const { _id } = user;
        const signatureToken = jsonwebtoken_1.default.sign({ _id }, jwtsecret, {
            expiresIn: "30mins",
        });
        res.cookie("token", signatureToken, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
        });
        return res.redirect("/login");
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.variables);
        if (validationResult.error) {
            return res.render("login", {
                error: validationResult.error.details[0].message,
            });
        }
        const user = await userModel_1.UserModel.findOne({ email });
        if (!user) {
            console.log("user not found");
            return res.render("Login", {
                error: "Invalid email or password",
            });
        }
        const { id } = user;
        const signatureToken = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        res.cookie("token", signatureToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (isMatch) {
            return res.redirect("/dashboard");
        }
        else {
            return res.render("login", {
                error: "Invalid email or password",
            });
        }
    }
    catch (err) {
        console.error(err);
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
exports.Logout = Logout;
// export const getUserAndMovies = async (req: Request, res: Response) => {
//   try {
//     const getAllUserVids = await UserModel.findAndCountAll({
//       include: [
//         {
//           model: MovieInstance,
//           as: "movie",
//         },
//       ],
//     });
//     return res.status(200).json({
//       msg: "You have succssfully retrieve all data",
//       count: getAllUserVids.count,
//       users: getAllUserVids.rows,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
/* ========================= USER API ========================*/
// export const Register = async (req: Request, res: Response) => {
//   try {
//     const { email, firstName, lastName, password, confirm_password } = req.body;
//     const iduuid = uuidv4();
//     //validate with joi or zod
//     const validationResult = registerUserSchema.validate(req.body, options);
//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message });
//     }
//     //Hash password
//     const passwordHash = await bcrypt.hash(password, 8);
//     //Create user
//     //-check if user exist
//     const user = await UserInstance.findOne({
//       where: { email: email },
//     });
//     if (!user) {
//       let newUser = await UserInstance.create({
//         id: iduuid,
//         email,
//         firstName,
//         lastName,
//         password: passwordHash,
//       });
//       //Generate token for user
//       const User = (await UserInstance.findOne({
//         where: { email: email },
//       })) as unknown as { [key: string]: string };
//       const { id } = User;
//       const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30mins" });
//       res.cookie('token', token, {httpOnly:true, maxAge: 30 * 60 * 1000})
//       return res.status(201).json({
//         msg: "user created successfully",
//         newUser,
//         token,
//       });
//       // return res.render("Login")
//     }
//     res.status(201).json({
//       error: "email already taken"
//     })
//     // //otp service
//     // //Email service
//     // //send Respnse
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({Error:"Internal serer error"})
//   }
// };
// export const Login = async (req: Request, res: Response) => {
//   try {
//     const { email,password} = req.body;
//     //validate with joi or zod
//     const validationResult = loginUserSchema.validate(req.body, options);
//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message });
//     }
//     const User = (await UserInstance.findOne({
//       where: { email: email },
//     })) as unknown as { [key: string]: string };
//     const { id } = User;
//     const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
//     res.cookie('token', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
//     const validUser = await bcrypt.compare(password, User.password);
//    if(validUser){
//       return res.status(201).json({
//          msg: "user have successfully logged in",
//          User,
//          token
//        });
//    }
//    return res.status(400).json({Error: "invalid email/password}"})
//    }catch (err) {
//       console.log(err);
// //       res.status(500).json({Error:"Internal serer error"})
//    }
// }
// export const getUserAndMovies = async(req: Request, res: Response) => {
//    try {
//         //sequelize findAll or findAndCountAll
//         //const getAllMovies = await MovieInstance.findAll();
//         const getAllUser = await UserInstance.findAndCountAll(
//          {
//             include:[
//             {
//                model: MovieInstance,
//                as: "movie"
//             }
//           ]
//          }
//         );
//         return res.status(200).json({
//         msg: "You have succssfully retrieve all data",
//         count: getAllUser.count,
//         users: getAllUser.rows
//        })
//     } catch (err) {
//      console.log(err);
//     }
// }
