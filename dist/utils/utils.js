"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieUserSchema = exports.updateMovieSchema = exports.loginUserSchema = exports.variables = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    userName: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    password: joi_1.default.string().min(5)
        .regex(/^[a-zA-Z0-9]{5,15}$/)
        .required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});
exports.variables = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().min(5)
        .regex(/^[a-zA-Z0-9]{5,15}$/)
        .required()
});
exports.updateMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    price: joi_1.default.number()
});
exports.MovieUserSchema = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    price: joi_1.default.number().required()
});
// export const createMovieUserSchema = Joi.object().keys({
//     email: Joi.string().trim().lowercase().required(),
//     password: Joi.string().min(5)
//       .regex(/^[a-zA-Z0-9]{5,15}$/)
//       .required()
// })
