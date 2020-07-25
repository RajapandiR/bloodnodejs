import CreateError from "http-errors";
import User from "../models/user_model";
import Token from "../models/token_model";
import UserSchema from "../schemas/user_schema";
import JsonSchemaValidator from '../utils/jsonschemavalidator';

import crypto from 'crypto';
import nodemailer from 'nodemailer';

class UserController {
    static async getUser (req, res)  {
        try{
            const users = await  User.find();
            res.json(users);
        }catch(err){
            res.json({message:err});
        }
    }; 
    static async postUser(req, res, next)  {
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, UserSchema.addUser())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
           await User.create(body, function(err, result) {
                if(err)
                    console.log("Error", err)
                // let user =  User.findOne({userName: req.body.userName})
                // if(user){
                //     throw new Error("username already taken")
                // }
                // user =  User.findOne({email: req.body.email})
                // if(user){
                //     throw new Error("email already taken")
                // }
                
                else {
                    var token = new Token({ userId: result._id, token: crypto.randomBytes(16).toString('hex') });
                    token.save(function (err) {
                    // if (err) { return res.status(500).send({ msg: err.message }); }
                        if(err)
                            console.log("Error", err)
                        var transporter = nodemailer.createTransport({ 
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user: 'rajapandibsc12@gmail.com',
                                pass: 'pandian12'
                            },
                            newline: 'windows',
                                tls : true,
                                logger: false  
                        });
                        
                        var mailOptions = {
                            from: 'rajapandibsc12@gmail.com', 
                            to: result.email, 
                            subject: 'Account Verification Token', 
                            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirm\/' + token.token + '.\n' 
                        };
                        transporter.sendMail(mailOptions, function (err) {
                            // if (err) { return res.status(500).send({ msg: err.message }); }
                            if(err)
                                console.log("Error", err)
                            res.status(200).send('A verification email has been sent to ' + result.email + '.');
                        });
                    });
                }
            })
                
                // if(!err)
                //     res.status(200).json(response)
                // else {
                //     res.json({message:err})
                // }
            
        }catch(err){
            next(err)
        }
    };
}
export default  UserController;