const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-l9bnm.mongodb.net/test?retryWrites=true&w=majority`;
// const url = 'mongodb://localhost:27017/graphqldb';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));