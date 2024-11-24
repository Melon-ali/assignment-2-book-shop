import { ProductModel } from '../product.model';
import { TProduct } from './product.interface';

// Create Book Product
const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

// Get All Book Products
const getAllProductsFromDB = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = await ProductModel.find(filter);
  return result;
};

// Get Single Book Products
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

// Update Book Product
const updateProductFromDB = async (id: string, data: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

// Delete Product
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
