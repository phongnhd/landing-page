import express from 'express';
import cors from 'cors';
import pool from './config/database.js';
import chatRoute from './routes/chat.route.js';
const app = express();
const PORT = process.env.PORT || 3000;

// CORS 
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/chat', chatRoute);

// async function connectDatabase() {
//   try {
//     await pool.query('SELECT NOW()');
//     console.log('[Database] Connection established successfully');
//   } catch (error) {
//     console.error('[Database] Connection failed:', error.message);
//     process.exit(1);
//   }
// }

// app.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({
//       status: 'healthy',
//       timestamp: result.rows[0].now,
//       service: 'postgres-api'
//     });
//   } catch (error) {
//     console.error('[API] Health check failed:', error.message);
//     res.status(500).json({
//       status: 'unhealthy',
//       message: 'Database connection failed',
//       timestamp: new Date().toISOString()
//     });
//   }
// });
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'nexttech-backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// async function startServer() {
//   await connectDatabase();
//   app.listen(PORT, () => {
//     console.log(`[Server] Listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
//     console.log(`[CORS] Allowing requests from ${CORS_ORIGIN}`);
//   });
// }
function startServer() {
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    console.log(`[CORS] Allowing requests from ${CORS_ORIGIN}`);
  });
}
process.on('uncaughtException', (error) => {
  console.error('[Fatal] Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Fatal] Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();
