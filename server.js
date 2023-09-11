require("dotenv").config(); // needed to make .env work
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require("./models/fruit");
const vegetables = require("./models/vegetables"); // Import vegetable routes
const mongoose = require("mongoose");
const methodOverride = require("method-override"); //

// console.log(process.env.ENVVAR);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected");
});
///////////////////////////////////////////////////////////

const jsxViewEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

// CSS Import
// serves static files (CSS) from the /public directory
app.use(express.static("public"));

// Middleware;
app.use((req, res, next) => {
  // console.log("Middleware: I run for all routes, 1");
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index route for fruits
app.get("/fruits", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render("fruits/Index", {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New route
app.get("/fruits/new", (req, res) => {
  console.log("New controller");
  res.render("fruits/New");
});

// Delete
app.delete("/fruits/:id", async (req, res) => {
  //this try catch is going to implement the delete functionality
  try {
    await Fruit.findByIdAndDelete(req.params.id); // get id from req params (:id)
    res.status(200).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }

  // res.send("deleting..."); // had in originally to test the route worked
});

// Update
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(
      // id is from the url that we got by clicking on the edit <a/> tag
      req.params.id,
      // the information from the form, with the update that we made above
      req.body,
      // need this to prevent a delay in the update
      { new: true }
    );
    console.log(updatedFruit);
    res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create route for fruits
app.post("/fruits", async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === "on";

    const createdFruit = await Fruit.create(req.body);

    res.status(201).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

// fruits.push(req.body);
// console.log(fruits);

// res.send("data received");

// Edit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Index for veggies
app.get("/vegetables", (req, res) => {
  res.render("vegetables/Index", { vegetables });
});

// New route for veggies
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

app.get("/vegetables/:id", (req, res) => {
  //second param of the render method must be an object
  res.render("vegetables/Show", {
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfVegetablessArray]
    vegetables: vegetables[req.params.id],
  });
});

app.post("/vegetables", (req, res) => {
  req.body.readyToEat = req.body.readyToEat === "on";
  vegetables.push(req.body);
  console.log(vegetables);

  res.send("data received");
});

// Show
app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    //second param of the render method must be an object
    res.render("fruits/Show", {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
// app.use("/vegetables", "vegetablesRoutes");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
