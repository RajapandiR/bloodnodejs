import CreateError from "http-errors";
import Role from "../models/role_model";
import RoleSchema from "../schemas/role_schema";
import JsonSchemaValidator from '../utils/jsonschemavalidator';

class RoleController {
    static async getRole (req, res)  {
        try{
            const Roles = await  Role.find();
            res.json(Roles);
        }catch(err){
            res.json({message:err});
        }
    }; 
    static async postRole(req, res, next)  {
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, RoleSchema.addRole())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            await Role.create(body, function(err, result) {
                const response = {
                    "statuscode": 200,
                    "message": "Create Successfull",
                    "data": result
                }
                if(!err)
                    res.status(200).json(response)
                else {
                    res.json({message:err})
                }
            })
        }catch(err){
            next(err)
        }
    };
}
export default  RoleController;