const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 4000;

mongoose.connect("mongodb+srv://admin_pableo:admin169@pableo-169.meswe.mongodb.net/EcommerceAPI169?retryWrites=true&w=majority", 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('Connected to MongoDB'));

// middlewares
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}`))
