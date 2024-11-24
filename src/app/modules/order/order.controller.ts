import { Request, Response } from 'express';
import { OrderServices } from './order.service';

// Controller for creating an order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Create the order using the service
    const order = await OrderServices.createOrderInToDB({
      email,
      product,
      quantity,
      totalPrice,
      createdAt: '', 
      updatedAt: '',
    });

    res.status(200).json({
      status: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Controller for calculating revenue
export const getRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();

    res.status(200).json({
      status: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// Exporting controllers as an object
export const OrderControllers = {
  createOrder,
  getRevenue,
};
