const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const config = require('./../config/config');
const baseUrl = config.baseUrl;
let result = null;
let tags = require('mocha-tags');

describe('Given I am on jsonplaceholder API to test with POST method', () => {

    tags('post', 'users').describe('When I POST a new user', () => {

        before((done) => {
            baseUrl
            .post('/users')
            .send({'id': 11, 'name': 'Nadir B', 'username': 'NB', 'email': 'n.b@saagie.fr'})
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 201', () => {
            expect(result).to.have.status(201);
        });

        it('Then the new user should have a username', () => {
            expect(result.body["username"]).to.not.be.empty;
        });

        it('And it must be a String', () => {
            expect(result.body["username"]).to.be.a("string");
        });

        it('Then this user should have an email', () => {
            expect(result.body["email"]).to.not.be.empty;
        });

        it('And it must contain  \'@\'', () => {
            expect(result.body["email"]).to.contain("@");
        });

    });

    tags('post', 'users', 'albums').describe('When I POST a new album for a user', () => {

        before((done) => {
            baseUrl
            .post('/albums')
            .send({'userId': 15, 'id': 101, 'title': 'Singing in the rain'})
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 201', () => {
            expect(result).to.have.status(201);
        });

        it('Then the new album should have a title property', () => {
            result.body.should.have.property('title');
        });

    });

});