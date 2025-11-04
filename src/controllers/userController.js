import { createUserService, deleteUserService, getUsersByEmailService, updateUserService, validateUserService } from '../services/userService.js';

//async es un llamado a algo externo que puede demorar
export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const getUsersByEmail = async (req, res) => {
    try {
        const users = await getUsersByEmailService();
        res.status(200).json(users);
    } catch (error) {
        if (error.message === 'Users not found') {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await deleteUserService(userId);
        res.status(200).json(response);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await updateUserService(userId, updateData);
        res.status(201).json(updatedUser);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const validateUser = async (req, res) => {
    try {
    // Deberiamos tomar los datos que nos mandan en el req
    const { email, password } = req.body;
    const result = await validateUserService(email, password)
    console.log({result})
        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 400){
            return res.status(error.statusCode).json({message: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}