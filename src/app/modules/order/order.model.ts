import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      trim: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: [true, 'Product is Required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is Required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total Price is Required'],
      min: [0, 'Total Price connot be negative'],
    },
  },
  { timestamps: true },
);

OrderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const OrderModel = model<TOrder>('order', OrderSchema);
