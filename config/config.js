const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const baseUrl = chai.request('https://jsonplaceholder.typicode.com');

module.exports = {
    baseUrl : baseUrl
};