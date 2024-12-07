import express from "express";
import { router as rootRouter } from "./routes/index.js"
import cors from "cors"
const app = express();
const PORT = 3000
app.use(cors())
app.use(express.json());
app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`Express is connected. Check http://localhost:${PORT}`);
});
