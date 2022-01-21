const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))