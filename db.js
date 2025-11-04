import mongoose from "mongoose";
import { MONGODB_URI, TPFinal_DB } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${TPFinal_DB}`);
        console.log("Conexión a la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
}