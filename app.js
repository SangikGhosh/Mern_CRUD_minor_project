const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user.js")


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")))

app.get("/", function(req, res) {
    res.render("index");
})

app.get("/read", async function(req, res) {
    let allUsers = await userModel.find();
    res.render("read" , {allUsers});
})

app.post("/create", async function(req, res) {
     let {name, email, image} = req.body
    let create =await userModel.create({
        image,
        email,
        name
    })
    res.redirect("/read")
})

app.get('/delete/:id', async function(req, res){// delete user
    await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.get("/edit/:id", async function(req, res) {
    let user = await userModel.findOne({_id: req.params.id});
    res.render("update", {user});
});

app.post("/update/:id", async function(req, res) {
    let {name, email, image} = req.body
    await userModel.findOneAndUpdate(
    {_id: req.params.id},
    {
        image,
        email,
        name
    },
    {new: true}
)
    res.redirect("/read")
})

app.listen(3000, function() {
    console.log("server is running on 3000");
})