import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import { registerUserSchema, loginUserSchema, variables } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET!;

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, userName, password, confirm_password } =
      req.body;
    const validationResult = registerUserSchema.validate(req.body);

    if (validationResult.error) {
      return res.render("Register", {
        error: validationResult.error.details[0].message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.render("Register", { error: "Email already exists" });
    }

    const newUser = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.render("Register", { error: "User not found" });
    }

    const { _id } = user;
    const signatureToken = jwt.sign({ _id }, jwtsecret, {
      expiresIn: "30mins",
    });

    res.cookie("token", signatureToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validationResult = loginUserSchema.validate(req.body, variables);

    if (validationResult.error) {
      return res.render("login", {
        error: validationResult.error.details[0].message,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("user not found");

      return res.render("Login", {
        error: "Invalid email or password",
      });
    }

    const { id } = user;

    const signatureToken = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });

    res.cookie("token", signatureToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.redirect("/dashboard");
    } else {
      return res.render("login", {
        error: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/");
};

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
