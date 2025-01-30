import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

// Create Book Product
const createProductIntoDB = async (product: TProduct) => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

// Get All Book Products
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // const filter = searchTerm
  //   ? {
  //       $or: [
  //         { title: { $regex: searchTerm, $options: 'i' } },
  //         { author: { $regex: searchTerm, $options: 'i' } },
  //         { category: { $regex: searchTerm, $options: 'i' } },
  //       ],
  //     }
  //   : {};

  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  // const result = await ProductModel.find(filter);
  return { data, meta };
};

// Get Single Book Products
const getSingleProductFromDB = async (id: string) => {
  const existingProduct = ProductModel.isProductExists(id);
  if (!existingProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist');
  }

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
