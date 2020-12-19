require('dotenv').config();

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

// Local Imports
const usersRoute = require('./routes/users-route');
const groupsRoute = require('./routes/groups-route');
const messagesRoute = require('./routes/messages-route');

const app = express();
app.use(express.json());
app.use(cors);

app.use('/api/users', usersRoute);
app.use('/api/groups', groupsRoute);
app.use('/api/messages', messagesRoute);

// Error Handler
app.use((error, req, res, next) => {
  console.log('An error occured:', error);
  res.json({ message: error.message || 'An unknown error occured.' });
});

// Connect to DB && Start server
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server up and running on port ${process.env.PORT || 5000}!`)
    );
  })
  .catch(error => console.log('Could not start server: ', error));
