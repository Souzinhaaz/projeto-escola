const express = require("express");
const connectDB = require("./database/db");

const classRoutes = require("./routes/class.routes");
const studentRoutes = require("./routes/student.routes");
// const reportCardRoutes = require("./routes/reportCard.routes");

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/class", classRoutes);
app.use("/students", studentRoutes);
// app.use("/reportcard", reportCardRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
