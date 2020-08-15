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
    picture: {
        type: String,
        default: "https://image.flaticon.com/icons/svg/78/78793.svg"
    },
    String,
    body: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const News = mongoose.model("New", newSchema);

//Landing Page
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


//Post News
app.get("/news/new", (req, res) => {
    res.render("new")
})

app.post("/news", (req, res) => {
    title = req.body.title;
    picture = req.body.picture;
    body = req.body.body;
    let receivedNews = {
        title,
        picture,
        body
    }
    News.create(receivedNews, (err, news) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})

//SHOW NEWS
app.listen(3000, () => console.log(`app running on port ${PORT} http://localhost:${PORT}`));