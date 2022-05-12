process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Courses = require('../models/course.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Courses', ()=>{
    before((done) => {
        Courses.deleteMany({course_name: "CS101"}, (err) => { 
           done();           
        });        
    });
    describe('/GET /courses', (done)=>{
        it('it should GET all the courses', (done)=>{
            chai.request(server)
                .get('/courses')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST /course/add', ()=>{
        it('it should POST a course', (done)=> {
            let course = {
                course_name: "CS101",
                course_specialisation: "TSCD"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET /courses/:courseID', ()=>{
        it('it should GET a course with given ID', (done)=>{
            chai.request(server)
                .get('/courses/626ba2233ade701a4bfcb04d')
                .end((err, res)=>{
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe('/POST /courses/:courseID/update', ()=>{
        it('it should UPDATE the course values', (done)=> {
            chai.request(server)
                .post('/courses/626ba2233ade701a4bfcb04d/update')
                .send({profID: "626babf9db9755f388ed88e3"})
                .end((err, res)=> {
                    res.should.have.status(200);
                    done();
                })
        })
    });
});