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
        const server = new ApolloServer({typeDefs, resolvers, formatError(err) {
            const data = err.originalError.data;
            const code = err.originalError.code || 500 ;
            const message = err.message || 'error';
            return {data, status : code, message}

        }, context: ({req}) => {
            const token = req.headers['token'];
            return {
                token
            };
        }})
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