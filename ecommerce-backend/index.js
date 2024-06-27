// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://user_1375:Mongo7095219161@cluster0.no3d6nk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const cartSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);
const Cart = mongoose.model('Cart', cartSchema);

const products = [
  { name: 'Product 1', description: 'Description of Product 1', price: 100, image: 'https://via.placeholder.com/150' },
  { name: 'Product 2', description: 'Description of Product 2', price: 200, image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

Product.insertMany(products)
  .then(() => console.log('Products added'))
  .catch((error) => console.log('Error adding products:', error));

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/cart', async (req, res) => {
  const { productId, name, description, price, image } = req.body;
  const newCartItem = new Cart({ productId, name, description, price, image });
  await newCartItem.save();
  res.status(201).json(newCartItem);
});

app.get('/cart', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

app.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
