import Joi from "joi";

export const registerUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  userName:Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(5)
    .regex(/^[a-zA-Z0-9]{5,15}$/)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "{{#label}} does not match"}),
});

export const variables = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ""
    }
  }
}

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().min(5)
      .regex(/^[a-zA-Z0-9]{5,15}$/)
      .required()
})

export const updateMovieSchema = Joi.object().keys({
    title: Joi.string().lowercase(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number()

})
export const MovieUserSchema = Joi.object().keys({
  title: Joi.string().required(), 
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required()
})



// export const createMovieUserSchema = Joi.object().keys({
//     email: Joi.string().trim().lowercase().required(),
//     password: Joi.string().min(5)
//       .regex(/^[a-zA-Z0-9]{5,15}$/)
//       .required()
// })
