
import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

export const createOrderInToDB = async (orderData: TOrder) => {
  const { product, quantity } = orderData;

  // fatch the product details
  const productDetails = await ProductModel.findById(product);

  if (!productDetails) {
    throw new Error('Product not found');
  }

  // Check if there is enough stock
  if (productDetails.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  productDetails.quantity -= quantity;
  productDetails.inStock = productDetails.quantity > 0;
  await productDetails.save();

  // create the order
  const order = await OrderModel.create(orderData);

  return order;
};

export const calculateRevenue = async (): Promise<number> => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$quantity', '$totalPrice'] } },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderInToDB,
  calculateRevenue,
};
