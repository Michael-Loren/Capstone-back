const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

app.use("/", require("./routes/login.js"));
app.use("/", require("./routes/Register.js"));
app.use('/profile',require('./routes/profile'))
app.use('/',require('./routes/listOfFood'))

app.get("/", (req, res) => {
    res.send('Hello world');
})
const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`))