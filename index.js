import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from './models/user.js'
import { name } from 'ejs';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/read", async (req, res) => {
    let userData = await userModel.find();
    res.render("read", { users: userData });
})

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    let created = await userModel.create({
        name: name,
        email: email,
        image: image
    })
    res.redirect("/read")
})

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({ id: req.params._id });
    res.redirect("/read");
})
app.get("/edit/:id", async (req, res) => {
        let user = await userModel.findById(req.params.id);     
        res.render("edit", { user }); 
});

app.post("/edit/:id", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findOneAndUpdate({_id:req.params.id}, { name, email, image });
    res.redirect("/read");
});

app.listen(3000)