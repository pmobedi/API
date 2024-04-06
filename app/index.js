const express = require('express');
const http = require('http');
const app = express();

module.exports = class Application {
    constructor(){
        this.ServerConfig()
    }
    ServerConfig(){
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log('server run on port 3000')
        })
    }
}