import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/newsletter', newsletterRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
