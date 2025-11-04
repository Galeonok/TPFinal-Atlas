import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';


export const createUserService = async (userData) => {
    const userExist = await User.findOne({ email: userData.email });
    if (userExist) {
        throw new Error('Email already exists');
    }
    const newUser = new User(userData);
    await newUser.save();
    return { message: 'User created successfully' };
}

export const getUsersByEmailService = async () => {
    const users = await User.find();
    if (users.length === 0) {
        throw new Error('Users not found');
        error.statusCode = 204;
        throw error;
    }
    return users;
}

export const deleteUserService = async (userId) => {
    const userExist = await User.findOne({ _id: userId });
    if (!userExist) {
        throw new Error('User not found');
    }
    await User.findByIdAndDelete(userId);
    return { message: 'User deleted successfully' };
}

export const updateUserService = async (userId, updateData) => {
    const userExist = await User.findOne({ _id: userId });
    if (!userExist) {
        throw new Error('User not found');
    }
    //new:true para que retorne el objeto actualizado
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser, { message: 'User updated successfully' };
}

export const validateUserService = async (email, password) => {
    console.log({email, password});
    if (!(email && password)) {
        const error = new Error('There is a missing field')
        error.statusCode = 400;
        throw error;
    }
    const userFound = await User.findOne({ email });
    console.log({userFound});
    if (!userFound) {
        const error = new Error('Email or password not found2');
        error.statusCode = 400;
        throw error;
    }
    //Comparo password que llega con la guardada en la DB
    //Encripta la password de req y la compara contra la encriptada de la DB
    if (!bcrypt.compareSync(password, userFound.password)) {
        const error = new Error('Email or password are incorrect');
        error.statusCode = 400;
        throw error;
    }
    //Info cargada en el token
    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    };
    //Firma del token
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    return { message: "Logged in", token };
}