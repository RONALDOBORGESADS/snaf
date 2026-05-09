import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import generateRoutes from "./routes/generate.js";
import usageRoutes from "./routes/usage.js";
import savedPostsRoutes from "./routes/saved-posts.js";
import stripeRoutes from "./routes/stripe.js";
import configRoutes from "./routes/config.js";
import onboardingRoutes from "./routes/onboarding.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

// ROTAS PÚBLICAS
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/stripe", stripeRoutes);

// ROTAS PROTEGIDAS
app.use("/api/generate", authMiddleware, generateRoutes);
app.use("/api/usage", authMiddleware, usageRoutes);
app.use("/api/saved-posts", authMiddleware, savedPostsRoutes);
app.use("/api/onboarding", authMiddleware, onboardingRoutes);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Erro:", err);
  res.status(err.status || 500).json({
    error: err.message || "Erro no servidor"
  });
});

app.listen(PORT, () => {
  console.log(`✅ ForgeFlux Backend rodando em http://localhost:${PORT}`);
});
