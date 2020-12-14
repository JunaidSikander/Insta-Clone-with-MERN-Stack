const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const {MONGO_URI} = require('./dev');

const app = express();
const PORT = 5000;

mongoose.connect(MONGO_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.use(express.json())
app.use('/',authRouter);

app.listen(PORT, () => {
  console.log("Server is UP")
})
