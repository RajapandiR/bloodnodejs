import createError from 'http-errors';
import User from '../models/user_model';
import Token from '../models/token_model';
import Role from '../models/role_model';
import AuthSchema from '../schemas/auth_schema';
import Jwt from '../utils/jwt';
import JsonSchemaValidator from '../utils/jsonschemavalidator';
import Bcrypt from 'bcryptjs';

class AuthController {
  static async login(req, res, next) {
    const { body } = req;
    let apiType = 'Rest Api';
    if(body.apiType){
      apiType = body.apiType;
      delete body.apiType;
    }
    try {
      const validate = JsonSchemaValidator.validate(body, AuthSchema.loginSchema());
      if (!validate.valid) {
        throw createError(400, JsonSchemaValidator.notValidate(validate.errors));
      }
      const getRole = await Role.findOne({ role: body.role });
      if (!getRole) {
        throw createError(400, "message.ROLE_INVALID");
      }
      const searchQuery = {};
      // searchQuery.userName = body.userName;
      // searchQuery.role = getRole._id;
      // console.log("searchQuery", searchQuery)
      const userData = await User.findOne({userName: body.userName}).populate('role');
      if (!userData) {
        throw createError(400, "Account invalid");
      }
      const checkPassword = await Bcrypt.compare(body.password, userData.password);
      if (!checkPassword) {  throw createError(400, "PASSWORD_WRONG");  }
      const payload = {
        userId: userData.id,
        role: userData.role.role
      };
      await User.findOne({userName: req.body.userName} , function(err, user) {
        const token =  Jwt.issueToken(payload);
        const jsonUserData = userData.toJSON();
        jsonUserData.token = token;
        console.log("User", user)
        const response = {
          statusCode: 200,
          message: "LOGINSUCCESS",
          data: jsonUserData
        };
        if(!user.verified){
          return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
        }
        else{
        res.status(200).json(response);    
        }
      

      })
      
      // if(apiType != 'render')
      //   res.status(200).json(response);
      // else
      //   next('', response);
      //res.status(200).json(response);
    } catch (err) {
      console.log("Error", err.message)
      next(err);
    }
  }
  static async confirm(req, res, next) {
    const url = req.url
    const token = url.split('/')
    const tokens = token[token.length-1]
    Token.findOne({ token: tokens }, function (err, token) {
        if (!token) return res.status(400).send({ msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.verified) return res.status(400).send({ msg: 'This user has already been verified.' });
 
            // verified and save the user
            user.verified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
  }

}

export default AuthController;
