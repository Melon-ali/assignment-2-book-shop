import { Model } from 'mongoose';

export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  isDeleted: boolean;
};

export interface IProduct extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct>;
}
