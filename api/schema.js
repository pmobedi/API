const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    user : String
}

`;

module.exports = typeDefs
