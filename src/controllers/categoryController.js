import { createCategoryService, deleteCategoryService, getCategoriesService } from "../services/categoryService.js";

export const createCategory = async (req, res) => {
    try {
        const name = req.body.name
        console.log(req)
        const savedCategory = await createCategoryService(name);
        return res.status(201).json({ message: `Category ${name} created succesfully` });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};

export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        return res.status(200).json(categories);
    }
    catch (error) {
        if (error.statusCode === 204) {
            return res.status(204).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;   
        const result = await deleteCategoryService(categoryId);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
}
