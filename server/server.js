require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users'); //userRoutes
const cartRoutes = require('./routes/cart');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

app.use('/api/users', userRoutes); //userRoutes
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Server is working!');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
