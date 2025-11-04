import category from "../models/categoryModel.js";

export const createCategoryService = async (name) => {
    const newCategory = new category({name});
    const savedCategory = await newCategory.save();
    return savedCategory;
};

export const getCategoriesService = async () => {
    const categories = await category.find();
    if (categories.length === 0) {
        const error = new Error('Categories not found');
        error.statusCode = 204;
        throw error;
    }
    return categories;
}; 

export const deleteCategoryService = async (categoryId) => {
    const categoryExist = await category.findOne({ _id: categoryId });  
    if (!categoryExist) {
        throw new Error(`Category ${categoryId} not found`);
        error.statusCode = 400;
        throw error;
    }
    await category.findByIdAndDelete(categoryId);
    return { message: `Category ${categoryId} deleted successfully` }; 
}