const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('./../config/config');
const baseUrl = config.baseUrl;
let result = null;
let tags = require('mocha-tags');

describe('Given I am on jsonplaceholder API to test with PUT method', () => {

    tags('put', 'users').describe('When I update an existing user', () => {

        before((done) => {
            baseUrl
            .put('/users/10')
            .send({'id': 10, 'name': 'Jean Z', 'username': 'JZ', 'phone': 0672354672})
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('Then the new user should have a username', () => {
            expect(result.body["username"]).to.not.be.empty;
        });

        it('And it must be a String', () => {
            expect(result.body["username"]).to.be.a("string");
        });

        it('Then the user phone must be a number', () => {
            expect(result.body["phone"]).to.be.a("number");
        });

    });

    tags('post', 'albums').describe('When I update an existing album title', () => {

        before((done) => {
            baseUrl
            .put('/albums/55')
            .send({'userId': 55, 'id': 6, 'title': 'September'})
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('Then the title album must be updated with \'September\'', () => {
            expect(result.body.title).to.be.equal('September');
        });

    });

});