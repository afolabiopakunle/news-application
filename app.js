const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost/news-application", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000, () => console.log(`app running on port ${PORT} http://localhost:${PORT}`))