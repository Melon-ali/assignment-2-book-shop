import express from 'express';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../users/user.constant';
import { UserControllers } from '../users/user.controller';
import { ProductControllers } from '../product/product.controller';

const router = express.Router();

// Block Route

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  UserControllers.blockUser,
);

// Delete Blog

router.delete(
  '/blogs/:id/',
  auth(USER_ROLE.admin),
  ProductControllers.deleteBlogByAdmin,
);

export const adminActionsRoutes = router;