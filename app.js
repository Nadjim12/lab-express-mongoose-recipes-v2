const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next) => {
    Recipe.create(req.body)
      .then(recipe => res.status(201).json(recipe))
      .catch(next);
  });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res, next) => {
    Recipe.find()
      .then(recipes => res.json(recipes))
      .catch(next);
  });


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res, next) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
      })
      .catch(next);
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(recipe => {
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
      })
      .catch(next);
  });
  
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
router.delete('/recipes/:id', (req, res, next) => {
    Recipe.findByIdAndRemove(req.params.id)
      .then(() => res.status(204).json({ message: 'Recipe deleted successfully' }))
      .catch(next);
  });
  


// Start the server
app.listen(5006, () => console.log('My first app listening on port 5006!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;