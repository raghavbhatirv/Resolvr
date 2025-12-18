import express from "express";
import { router } from "./routes/index.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", router)

app.get("/", (req, res) => {
  res.send("Hello! 👋 Server is running like Usain Bolt! ⚡️ 🏃");
});

app.listen(PORT, () => {
  console.log(`Server is running like Usain Bolt on http://localhost:${PORT} ⚡️ 🏃`)
});

