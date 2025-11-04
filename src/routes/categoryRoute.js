import express, { Router } from 'express';
import { createCategory, deleteCategory, getCategories } from '../controllers/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post('/', createCategory);
//http://localhost:3000/api/category/
categoryRoute.get('/', getCategories);
//http://localhost:3000/api/category/
categoryRoute.delete('/:id', deleteCategory);
//http://localhost:3000/api/category/:id


export default categoryRoute;

 