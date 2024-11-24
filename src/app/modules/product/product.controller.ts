import { Request, Response } from 'express';
import { ProductServices } from './product.service';

// Create Book Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      status: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// Get All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Extract searchTerm from query parameters
    const { searchTerm } = req.query;

    // Pass the searchTerm to the service
    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    res.status(200).json({
      status: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Get Single Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    console.log(result);
    res.status(200).json({
      status: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// Update Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const body = req.body;
    const result = await ProductServices.updateProductFromDB(productId, body);

    res.status(200).json({
      status: true,
      message: 'Book updated  successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    console.log(result);
    res.status(200).json({
      status: true,
      message: 'Book deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
