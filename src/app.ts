import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';
import router from './app/routes';
import notFound from './app/middlwares/notFound';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router)

app.use('/api', ProductRoutes);

app.use('/api', orderRoutes);

app.use(notFound);
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Server Live',
  });
});

export default app;
