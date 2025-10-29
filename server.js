import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables FIRST
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["DATABASE_URL", "GOOGLE_CLIENT_ID", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error("\n❌ Missing required environment variables:");
  missingEnvVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.error("\n Please check your .env file\n");
  process.exit(1);
}

// Import API handlers AFTER env vars are loaded
import loginHandler from "./api/auth/login.js";
import logoutHandler from "./api/auth/logout.js";
import meHandler from "./api/auth/me.js";
import initDbHandler from "./api/auth/init-db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Convert Vercel serverless handlers to Express routes
const wrapHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
};

// Auth routes
app.post("/api/auth/login", wrapHandler(loginHandler));
app.post("/api/auth/logout", wrapHandler(logoutHandler));
app.get("/api/auth/me", wrapHandler(meHandler));
app.get("/api/auth/init-db", wrapHandler(initDbHandler));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasJwtSecret: !!process.env.JWT_SECRET,
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Development API Server started!`);
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log(`📍 Frontend should use: http://localhost:${PORT}/api`);
  console.log(`\n✅ Environment check:`);
  console.log(
    `   - Google Client ID: ${process.env.GOOGLE_CLIENT_ID ? "✓" : "✗"}`
  );
  console.log(`   - Database URL: ${process.env.DATABASE_URL ? "✓" : "✗"}`);
  console.log(`   - JWT Secret: ${process.env.JWT_SECRET ? "✓" : "✗"}`);
  console.log(`\n🔍 Test endpoints:`);
  console.log(`   - Health: http://localhost:${PORT}/api/health`);
  console.log(`   - Init DB: http://localhost:${PORT}/api/auth/init-db`);
  console.log("\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Closing server...");
  process.exit(0);
});
