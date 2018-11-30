const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const rental = require('./models/rental');
const FakeDb = require('./fake-DB');
const rentalRoutes = require('./routes/rentals')

mongoose.connect(config.DB_URI).then(()=>{
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
}).catch(()=>{

})

const app = express();


app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log('I am running')
})