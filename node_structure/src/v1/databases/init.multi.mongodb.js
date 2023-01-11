const mongoose = require('mongoose');

const newConnection = (uri) => {
    const db = mongoose.createConnection(uri, {useNewUrlParser: true})

    db.on('error', function(err){
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(err)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`))
    })

    db.on('connected', function(){
        mongoose.set('debug', (col, method, query, doc) => {
            console.log(`MongoDB Debug :: ${this.conn.name}:${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`)
        })

        console.log(`MongoDB connected :: ${this.name}`)
    })

    db.on('disconnected', function(err){
        console.log(`MongoDB disconnect :: ${this.name} ${JSON.stringify(err)}`);
    })

    return db;
}

const {STUDENT_URI, STUDENT_TEST_URI} = process.env;

const studentDB = newConnection(STUDENT_URI);
const studentTestDB = newConnection(STUDENT_TEST_URI);

module.exports = {
    studentDB,
    studentTestDB,
}
