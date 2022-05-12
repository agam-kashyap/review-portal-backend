process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Reviews = require('../models/review.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Review', ()=>{
    describe('/GET /review', (done)=>{
        it('it should GET all the review', (done)=>{
            chai.request(server)
                .get('/review')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET /review/course/courseID', (done)=>{
        it('it should GET all the reviews of a course', (done)=>{
            chai.request(server)
                .get('/review/course/626ba2233ade701a4bfcb04d')
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /review/prof/profID', (done)=>{
        it('it should GET all the reviews of a prof', (done)=>{
            chai.request(server)
                .get('/review/prof/626babf9db9755f388ed88e3')
                .end((err,res)=>{
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('/POST /review/add', ()=>{
        it('it should POST a review', (done)=> {
            let review = {
                    review_user: "626a936f2d650e8911e4a066",
                    review_course: "626ba2233ade701a4bfcb04d",
                    upvote: 10,
                    downvote: 2,
                    date: "2022-05-05T16:40:22.234+00:00",
                    prof_rate: 6,
                    takeAgain: true,
                    quality: 6,
                    difficulty: 6,
                    grading: "strict",
                    attendance: true,
                    project: true,
                    tags: ["awesome", "wow", "great"],
                    content: "Hey THis  ipsum whichem nor ipsum"
              }
            chai.request(server)
                .post('/review/add')
                .send(review)
                .end((err, res)=> {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
})