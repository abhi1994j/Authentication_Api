import Joi from 'joi';

//  validates for client incoming data (request layer)
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerSchema }
