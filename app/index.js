const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();

module.exports = class Application {
    constructor(){
        this.ServerConfig();
        this.DatabaseConfig();

    }
    ServerConfig(){
        const server = http.createServer(app);
        server.listen(config.port , () => {
            console.log('server run on port 3000')
        })
    }

    DatabaseConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url);
    }

}