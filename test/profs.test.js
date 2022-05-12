process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Profs = require('../models/prof.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Profs', ()=>{
    // Testing GET /profs
    describe('/GET Profs', ()=> {
        it('it should GET all profs', (done)=> {
            chai.request(server)
                .get('/profs')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });    

    // Testing POST /profs/add
    describe('/POST /prof/add', ()=>{
        it('it should POST a prof', (done)=> {
            let prof = {
                prof_name: "GSR",
                prof_diff: 8,
                prof_qual: 9,
                prof_takeAgain: 99,
                prof_tags: ["awesome", "great"]
            }
            chai.request(server)
                .post('/profs/add')
                .send(prof)
                .end((err, res)=> {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Testing GET /prof/:profID
    describe('/GET /profs/:profID', ()=>{
        it('it should GET a prof with given ID', (done)=>{
            chai.request(server)
                .get('/profs/626babf9db9755f388ed88e3')
                .end((err, res)=>{
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe('/POST /profs/:profID/update', ()=>{
        it('it should UPDATE the prof values', (done)=> {
            chai.request(server)
                .post('/profs/626babf9db9755f388ed88e3/update')
                .send({})
                .end((err, res)=> {
                    res.should.have.status(201);
                    done();
                })
        })
    });
    after((done)=>{
        Profs.deleteOne({prof_name: "GSR"}, (err) => { 
            done();           
         });  
    });
});
