const User = require('app/models/users');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const resolvers = {
    Query : {
        user : (param, args, { check }) => {
            if(check) {
                return "ali kiani"
            } else {
                const error = new Error('Input Error');
                error.code = 401,
                error.data = [{ message : 'دسترسی شما به اطلاعات مسدود شده است'}];
                throw error;
            }
        },
        login : async (param, args, { secretId }) => {
            const errors = [];
            try {
                const user = await User.findOne({ phone : args.phone});
                if(!user) {
                    errors.push({ message : 'کاربر در سیستم ثبت نام نکرده است'})
                }

                const isValid = bcrypt.compareSync(args.password, user.password);
                if(!isValid) {
                    errors.push({ message : 'پسورد وارد شده اشتباه است'})
                }

                if(errors.length > 0) {
                    throw error;
                }

                return {
                    token : await User.CreateToken(user.id, secretId, '24h')
                }

            } catch {
                const error = new Error('Input Error');
                error.code = 401,
                error.data = errors;
                throw error;
            }
        },
   
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
                    const user = await User.findOne({ phone: args.phone })
                    if(user){
                        errors.push({ message :'این شماره همراه قبلا در سیستم ثبت شده است'});
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
                        message : 'اطلاعات شما در سیستم ذخیره شد'  }
                } catch {
                    const error = new Error('Input error');
                    error.code = 401;
                    error.data = errors;
                    throw error;
                }
            },
    
        },
      }

module.exports = resolvers;