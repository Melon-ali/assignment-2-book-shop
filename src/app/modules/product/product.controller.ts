/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Create Book Product
const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ProductServices.createProductIntoDB(product);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

// Get All Products
const getAllProducts = catchAsync(async (req, res) => {
  // Extract searchTerm from query parameters
  // const { searchTerm } = req.query;

  // Pass the searchTerm to the service
  const { data, meta } = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Books retrieved successfully',
    data,
    meta,
  });
});

// Get Single Product
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  console.log(result);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// Update Product
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const body = req.body;
  const result = await ProductServices.updateProductFromDB(productId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);
  console.log(result);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
