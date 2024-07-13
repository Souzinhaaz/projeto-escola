import express from "express"
import connectDB from "./database/db.js";

import classRoutes from "./routes/class.routes.js";
import studentRoutes from "./routes/student.routes.js";
import reportCardRoutes from "./routes/reportCard.routes.js";

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/class", classRoutes);
app.use("/student", studentRoutes);
app.use("/reportcard", reportCardRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
