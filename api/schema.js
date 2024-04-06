const {buildSchema} = require('graphql');

const schema = buildSchema (`
type Query {
    user : String
}
`);
module.exports = schema