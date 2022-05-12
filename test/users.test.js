process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Users = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('users', ()=>{
    before((done) => {
        Users.deleteOne({username: "DUMMY"}, (err) => { 
           done();           
        });        
    });
    describe('/GET /users', (done)=>{
        it('it should GET all the users', (done)=>{
            chai.request(server)
                .get('/users')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST /users/register', (done)=>{
        it('it should ADD a new user to Database', (done)=>{
            let user = {
                username: "DUMMY",
                name: "DUM",
                password: "DUMMY",
                email: "dummy@gmail.com"
            }
            chai.request(server)
                .post('/users/register')
                .send(user)
                .end((err, res)=>{
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('/POST /users/login', (done)=>{
        it('it should NOT LOGIN using the wrong credentials', (done)=>{
            let cred = {
                email: "d@g",
                password: "DUMMY"
            }
            chai.request(server)
                .post('/users/login')
                .send(cred)
                .end((err, res)=>{
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should LOGIN using the correct credentials', (done)=>{
            let cred = {
                email: "dummy@gmail.com",
                password: "DUMMY"
            }
            chai.request(server)
                .post('/users/login')
                .send(cred)
                .end((err, res)=>{
                    res.should.have.status(200);
                    done();
                });
        });
    });        
});