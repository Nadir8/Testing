const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('./../config/config');
const baseUrl = config.baseUrl;
let result = null;
let tags = require('mocha-tags');

module.exports = function hello(){
    console.log("hello world");
}

describe('Given I am on jsonplaceholder API to test with DELETE method', () => {

    tags('delete', 'users').describe('When I delete an existing user with his id', () => {

        before((done) => {
            baseUrl
            .delete('/users/8')
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

    });

    tags('delete', 'albums').describe('When I delete an existing album with his id', () => {

        before((done) => {
            baseUrl
            .delete('/albums/99')
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

    });

});