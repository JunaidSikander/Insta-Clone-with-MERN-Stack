const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const {MONGO_URI} = require('./dev');

const app = express();
const PORT = 5000;

mongoose.connect(MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify: false})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use('/', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log("Server is UP")
});
