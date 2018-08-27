const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require("./../model/todo");

// Testing lifecycle method
// Do something before the test cases are executed.
// Only will run the test case after done is called
beforeEach((done) => {
    // Delete all data in todos collection
    Todo.deleteMany({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {

    it("should create a new todo", (done) => {
        let text = "Test todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(
            (res) => {
                expect(res.body.text).toBe(text);
            }
        )
        .end(
            (err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find({}, null, null).exec(
                    (err, todos) => {

                        if (err) {
                            return done(err);
                        }

                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }
                );

            }
        );
    });


    it('Should not create todo with invalid data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            expect(res.body).toEqual({});

            Todo.countDocuments({}, (err, count) => {
                expect(count).toBe(0);
                done();
            });

        });
    });
});
