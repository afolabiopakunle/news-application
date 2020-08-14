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

//NEWS SCHEMA
const newSchema = mongoose.Schema({
    title: String,
    picture: String,
    body: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const News = mongoose.model("New", newSchema);

// News.create({
//     title: "AlphaBlog is LIVE!!!",
//     picture: "https://naijanetworth.com/wp-content/uploads/2019/04/Newspapers.jpg",
//     body: "A Nigerian newspaper and Online version of the Vanguard, a daily publication in Nigeria covering Nigeria news, Niger delta, general national news, politics, ..."
// })

app.get("/", (req, res) => {
    News.find({}, (err, news) => {
        if (err) {
            console.log(err)
        } else {

            res.render("index", {
                news
            })
        }
    })
})

app.listen(3000, () => console.log(`app running on port ${PORT} http://localhost:${PORT}`));