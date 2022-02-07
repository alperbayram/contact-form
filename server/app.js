const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const ContactRoute = require('./Routes/ContactRoute');

const app = express();
dotenv.config();

//middleware
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', ContactRoute);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//connect port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
