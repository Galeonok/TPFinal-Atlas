import Product, {statusEnum} from "../models/productModel.js"

export const createProductService = async (productData) => {
    const productExist = new Product(productData);
    const savedProduct = await productExist.save();
    return savedProduct;
}

export const getProductsService = async () => {
    //find().populate('category') trae los datos de la categoria relacionada
    const products = await Product.find().populate('category');
    if (products.length === 0) {
        const error = new Error('Products not found');
        error.statusCode = 204;
        throw error;
    }
    return products;
}

export const findProductByNameService = async (name) => {
    const product = await Product.find({ 
        name: { $regex: name, $options: 'i' }       
    });
    if (!product) {
        const error = new Error(`Product ${name} not found`);
        error.statusCode = 400;
        throw error;
    }
    return { product };
}

export const findProductByIdService = async (productId) => {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        const error = new Error(`Product ${productId} not found`);
        error.statusCode = 400;
        throw error;
    }
    return {product};
}

export const updateProductService = async (productId, updateData) => {
    const product = await Product.findOne({_id: productId});
    if (!product) {
        const error = new Error(`Product ${id} not found`); 
        error.statusCode = 400;
        throw error;
    }
    const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, updateData, { new: true }        
    );
    return updatedProduct;
}

export const deleteProductService = async (productId) => {
    const product = await Product.findOne({_id: productId});
    if (!product) {
        const error = new Error(`Product ${productId} not found`);
        error.statusCode = 400;
        throw error;
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return {message: "Deleted successfully", deletedProduct};
}

export const getStatusService = async () => {
    return statusEnum;
}