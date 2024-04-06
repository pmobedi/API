

const resolvers = {
    Query : {
          user : () => {
                return "ali"
            }
        },
    Mutation: {
        register : (param, args) => {
                console.log(args);
        }
    }
  
}

module.exports = resolvers;