const Joi = require('joi');
const userService = require("../services/userServies");
const generateToken = require("../middleware/generateToken");

// Controller methods
const signIn = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if(error) res.status(400).json({ message: error });
    
    const result = await userService.signIn(value);
    if(result) {
      res.status(201).json({ message: "SignIn successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if(error) res.status(400).json({ message: error });

    const result = await userService.logIn(value);
    if(result.length > 0) {
      const token = generateToken(result[0].email)
      res.status(200).json({ token });
    } else {
      res.status(200).json({ message: "Invalid Credentials"});
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};


module.exports = {
    signIn,
    logIn,
};