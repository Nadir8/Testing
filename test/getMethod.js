const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('./../config/config');
const baseUrl = config.baseUrl;
let result = null;
let tags = require('mocha-tags');
const getMethodUtils = require('./../utils/getMethodUtils');

describe('Given I am on jsonplaceholder API to test with GET method', () => {

    tags('get', 'users').describe('When I GET all users', () => {

        before((done) => {
            baseUrl
            .get('/users')
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('Then the result should be an array', () => {
            expect(result.body).to.be.an("array");
        });

        it('And it contains 10 users', () => {
            expect(result.body).to.have.lengthOf(10);
        });

        it('Then all users must contain all properties', () => {
            expect(getMethodUtils.hasResourcesAllProperties(result.body, 
                ['id', 'name', 'website', 'username', 'phone', 'email', 'company', 'address']))
                    .to.be.true;
        });

        it('And address property must contain all address informations', () => {
            expect(getMethodUtils.hasPropertyAllInformations(result.body,
                "address",
                    ['street', 'suite', 'city', 'zipcode', 'geo']))
                       .to.be.true;
        });

        it('And company property must contain all company informations', () => {
            expect(getMethodUtils.hasPropertyAllInformations(result.body,
                "company",
                    ['name', 'catchPhrase', 'bs']))
                       .to.be.true;
        });

    });

    tags('get', 'users').describe('When I GET the fifth user by his id', () => {
        
        const fifthUserEndPoint = "?id=5"
        before((done) => {
            baseUrl
            .get('/users' + fifthUserEndPoint)
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('And the user id should be 5', () => {
            expect(result.body[0]["id"]).to.be.equal(5);
        });

        it('Then just one user must be found', () => {
            expect(result.body).to.have.lengthOf(1);
        });

        it('Then username must be Kamren', () => {
            expect(getMethodUtils.isValueMatchWithItsProperty(result.body[0], "username", "Kamren"))
                .to.be.true;
        });

        it('And his name must be Chelsey Dietrich', () => {
            expect(getMethodUtils.isValueMatchWithItsProperty(result.body[0], "name", "Chelsey Dietrich"))
                .to.be.true;
        });

        it('Then his phone number must be filled in', () => {
            expect(result.body[0]["phone"]).to.not.be.empty;
        });

        it('And also his email', () => {
            expect(result.body[0]["email"]).to.not.be.empty;
        });

    });

    tags('get', 'albums').describe('When I GET all albums', () => {

        before((done) => {
            baseUrl
            .get('/albums')
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('Then the result should be an array', () => {
            expect(result.body).to.be.an("array");
        });

        it('And it contains 100 albums', () => {
            expect(result.body).to.have.lengthOf(100);
        });

    });

    tags('get', 'users', 'albums').describe('When I GET the albums of the seventh user', () => {
        
        const seventhUserEndPoint = "?userId=7"
        before((done) => {
            baseUrl
            .get('/albums' + seventhUserEndPoint)
            .end((err, res) => {
              result = res;
              done();
            });
        });

        it('Then status should be 200', () => {
            expect(result).to.have.status(200);
        });

        it('Then user has exactly 10 albums', () => {
            expect(result.body).to.have.lengthOf(10);
        });

        it('And all albums must have a title', () => {
            expect(getMethodUtils.hasResourcesSpecificProperty(result.body, 
                ['title']))
                    .to.be.true;
        });

    });

});