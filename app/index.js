const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const { graphqlHTTP } = require('express-graphql');
const typeDefs = require('api/schema');
const resolvers = require('api/resolver');
const app = express();

module.exports = class Application {
    constructor(){
        this.ServerConfig();
        this.DatabaseConfig();
        this.Routes();

    }
    ServerConfig(){
        const server = new ApolloServer({typeDefs, resolvers})
        server.start().then(() => {
            server.applyMiddleware({app})
            app.listen(config.port , () => {
                console.log('server run on port 3000')
            })
          });
       
    }

    DatabaseConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url);
    }

    Routes() {

    }

}