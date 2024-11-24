import { model, Schema } from 'mongoose';
import { TProduct } from './product/product.interface';

// Define the PRoduct schema

const ProductSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: [true, 'Book Title is Required.'],
      trim: true,
    },
    author: { type: String, required: [true, 'Author is Required.'] },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number.'],
    },
    category: { type: String, required: [true, 'Category is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a non-negative number.'],
    },
    inStock: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // Automatically manages createdAt and updatedAt
);

export const ProductModel = model<TProduct>('product', ProductSchema);
