import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/products', ProductControllers.getAllProducts);

router.get('/:productId', ProductControllers.getSingleProduct);

router.put('/:productId', ProductControllers.updateProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
