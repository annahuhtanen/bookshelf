const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    errorController = require("./controllers/errorController"),
    homeController = require("./controllers/homeController"),
    usersController = require("./controllers/usersController"),
    subscribersController = require("./contollers/subscribersController"),
    booksController = require("./controllers/booksController"),
    moviesController = require("./controllers/moviesController")


mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/bookshelf",
    { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

router.use(express.json());
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
//router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/books", booksController.index, booksController.indexView);
router.get("/books/new", booksController.new);
router.post("/books/create", booksController.create, booksController.redirectView);
router.get("/books/:id/edit", booksController.edit);
router.put("/books/:id/update", booksController.update, booksController.redirectView);
router.delete("/books/:id/delete", booksController.delete, booksController.redirectView);
router.get("/books/:id", booksController.show, booksController.showView);

router.get("/movies", moviesController.index, moviesController.indexView);
router.get("/movies/new", moviesController.new);
router.post("/movies/create", moviesController.create, moviesController.redirectView);
router.get("/movies/:id/edit", moviesController.edit);
router.put("/movies/:id/update", moviesController.update, moviesController.redirectView);
router.delete("/movies/:id/delete", moviesController.delete, moviesController.redirectView);
router.get("/movies/:id", moviesController.show, moviesController.showView);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);


app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});