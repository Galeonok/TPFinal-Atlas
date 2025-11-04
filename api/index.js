import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from '../db.js';
import { PORT, SECRET } from '../config.js';
import userRoute from '../src/routes/userRoute.js';
import session from 'express-session';
import categoryRoute from '../src/routes/categoryRoute.js';
import { productRoute } from '../src/routes/productRoute.js';


const app = express();
connectDB();

// Middleware
app.use(bodyParser.json());
//Parsear a json los datos que vienen por un formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRET, 
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

