const User = require('app/models/users');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const resolvers = {
    Query : {
          user : () => {
                return "ali"
            }
        },
        Mutation : {
            register : async (param, args) => {
                const errors = [];
                try {
                    if(validator.isEmpty(args.phone)) {
                        errors.push({ message : 'شماره همراه نمی تواند خالی باشد'})
                    }
    
                    if(!validator.isLength(args.phone, { min : 10, max : 11 })) {
                        errors.push({ message : 'شماره همراه به درستی وارد نشده است'})
                    }
    
        
                    if(errors.length > 0) {
                        throw error;
                    }
        
                    const salt = bcrypt.genSaltSync(15);
                    const hash = bcrypt.hashSync(args.password, salt);
        
                    await User.create({
                        phone : args.phone,
                        password : hash
                    })
        
                    return {
                        status : 200,
                        message : 'اطلاعات شما در سیستم ذخیره شد'
                    }
                } catch {
                    const error = new Error('Input error');
                    error.code = 401;
                    error.data = errors;
                    throw error;
                }
            },
    
        }
}


        
        


module.exports = resolvers;