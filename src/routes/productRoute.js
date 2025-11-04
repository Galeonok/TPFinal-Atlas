import express from 'express';
import { createProduct, deleteProduct, findProductById, findProductByName, getProducts, getStatus, updateProduct } from '../controllers/productController.js';

export const productRoute = express.Router();

productRoute.get('/status', getStatus)
//http://localhost:3000/api/products/status
productRoute.post('/', createProduct);
//http://localhost:3000/api/products/
productRoute.get('/', getProducts);
//http://localhost:3000/api/products/
productRoute.post('/name', findProductByName);
//http://localhost:3000/api/products/:name
productRoute.get('/:id', findProductById);
//http://localhost:3000/api/products/:id
productRoute.put('/update/:id', updateProduct)
//http://localhost:3000/api/products/update/:id
productRoute.delete('/:id', deleteProduct);
//http://localhost:3000/api/products/:id
