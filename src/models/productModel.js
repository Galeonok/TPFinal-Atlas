import mongoose from 'mongoose';
import category from './categoryModel.js';

export const statusEnum = ['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED'];

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], maxLength: 50, trim: true, unique: true },
    description: { type: String, required: true, maxLength: 1000, trim: true },
    costPrice: { type: Number, required: true, min: 0 },
    profitRate: { type: Number, default: 1.50, required: true, min: [1, "Profit rate must be greater or equal to 1"] },//Valor adicional al precio de costo
    //Es equivalente a FK en DB noSQL (Viene desde la coleccion "categories" en categoryModel)
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    stock: { type: Number, default: 0, required: true, min: [0, "Stock mus be up to 0" ]},
    status: {
        type: String,
        validate: {
            validator: function (v) {
                return statusEnum.includes(v) 
            },
            message: props => `Status is not valid`
        }
    },

    highlighted: { type: Boolean, default: false },

});

productSchema.methods.decreaseStock = async function(quantity) {
    /*if(quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
    }*/
    if (quantity > this.stock) {
        throw new Error('Insufficient stock');
    }
    this.stock -= quantity
    //return this.stock;
    await this.save();
}

//Atributo/Propiedades Virtual: No se guarda en la DB, es solo para consultas
productSchema.virtual('salePrice').get(function() {
    return this.costPrice * this.profitRate;
});
//Configuracion para incluir los virtuals en las respuestas JSON y Object
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.model('Product', productSchema);

//02:22:00