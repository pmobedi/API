const User = require('app/models/users');
const mkdirp = require('mkdirp');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mutimedia = require('app/models/multimedia');
const path = require('path');
const fs = require('fs');
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
            mutimedia : async(param, args, {check, isAdmin}) => {
                    if(check && isAdmin){
                        let errors= [];
                            try{
                                const { createReadStream, filename } = await args.image;
                                const stream = createReadStream();
                                const { filePath } = await saveImage({ stream, filename});
            
                                await Multimedia.create({
                                    name : filename,
                                    dir : filePath
                                })
                                return {
                                    status : 200,
                                    message : 'تصاویر در رسانه ذخیره شد'
                                }

                            }catch{
                                const error = new Error('Input Error');
                                error.code = 401,
                                error.data = errors;
                                throw error;
                            }
                    }else{
                        const error = new Error('Input Error');
                        error.code = 401,
                        error.data = [{ message : 'دسترسی شما به اطلاعات مسدود شده است'}];
                        throw error;
                    }
            }
    
        },
      }
      let saveImage = ({ stream, filename}) => {
        const date = new Date();
        let dir = `/uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
        mkdirp.sync(path.join(__dirname, `/public/${dir}`))
    
        let filePath = `${dir}/${filename}`;
    
        if(fs.existsSync(path.join(__dirname,`/public/${filePath}`))) {
            filePath = `${dir}/${Date.now()}-${filename}`
        }
    
        return new Promise((resolve, reject) => {
            stream
                .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filePath}`)))
                .on('error', error => reject(error))
                .on('finish', () => resolve({filePath}))
        })
    }
module.exports = resolvers;