import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Controller for creating an order
export const createOrder = catchAsync(async (req, res): Promise<void> => {
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

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

// Controller for calculating revenue
export const getRevenue = catchAsync(async (req, res): Promise<void> => {
  const totalRevenue = await OrderServices.calculateRevenue();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order created successfully',
    data: {
      totalRevenue,
    },
  });
});

// Exporting controllers as an object
export const OrderControllers = {
  createOrder,
  getRevenue,
};
