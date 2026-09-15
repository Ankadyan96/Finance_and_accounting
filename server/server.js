import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Route imports
import healthRoutes from './routes/health.js';
import seedRoutes from './routes/seed.js';
import accountRoutes from './routes/accounts.js';
import journalRoutes from './routes/journalEntries.js';
import periodRoutes from './routes/periods.js';
import userRoutes from './routes/users.js';
import invoiceRoutes from './routes/invoices.js';
import bankRoutes from './routes/bankTransactions.js';
import authRoutes from './routes/auth.js';
import commissionPlanRoutes from './routes/commissionPlans.js';
import commissionTransactionRoutes from './routes/commissionTransactions.js';
import pasEventRoutes from './routes/pasEvents.js';
import posEventRoutes from './routes/posEvents.js';
import policyRoutes from './routes/policies.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
connectDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(morgan(isProd ? 'combined' : 'dev'));

// Static assets serving for production if react/dist exists
const reactDistPath = path.join(__dirname, '..', 'react', 'dist');
if (fs.existsSync(reactDistPath)) {
  app.use(express.static(reactDistPath));
}

// Root endpoint
app.get('/', (req, res) => {
  if (isProd && fs.existsSync(path.join(reactDistPath, 'index.html'))) {
    return res.sendFile(path.join(reactDistPath, 'index.html'));
  }
  res.json({
    name: 'Veridex Finance System Backend API',
    status: 'online',
    documentation: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/journal-entries', journalRoutes);
app.use('/api/periods', periodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/bank-transactions', bankRoutes);
app.use('/api/commission-plans', commissionPlanRoutes);
app.use('/api/commission-transactions', commissionTransactionRoutes);
app.use('/api/pas-events', pasEventRoutes);
app.use('/api/pos-events', posEventRoutes);
app.use('/api/policies', policyRoutes);

// SPA fallback for non-API routes in production
if (fs.existsSync(reactDistPath)) {
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(reactDistPath, 'index.html'));
  });
}

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]:', err.stack || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Veridex Finance System API Server Running`);
  console.log(`  Environment:  ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Local URL:    http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Graceful Shutdown
const handleShutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('[Server] HTTP server closed.');
    try {
      await mongoose.connection.close();
      console.log('[MongoDB] Connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('[MongoDB] Error during disconnect:', err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('[Server] Forceful shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;

