const User = require('app/models/users')

const resolvers = {
    Query : {
          user : () => {
                return "ali"
            }
        },
    Mutation: {
        register : async (param, args) => {
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