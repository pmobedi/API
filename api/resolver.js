const User = require('app/models/users');
const validator = require('validator');
const resolvers = {
    Query : {
          user : () => {
                return "ali"
            }
        },
    Mutation: {
        register : async (param, args) => {

            const erros = [];
            if(validator.isEmpty(args.phone)){
                erros.push({message : 'شماره همراه نمی تواند خالی باشد'})
                console.log(erros);
                return;
            }
              await  User.create({
                    phone : args.phone,
                    password : args.password,
                })
                return{
                    status: 200,
                    message : 'اطلاعات شما در سیستم ذخیره شد'
                }
        }
        
    }
  
}

module.exports = resolvers;