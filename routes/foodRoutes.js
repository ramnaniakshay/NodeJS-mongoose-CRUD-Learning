const express = require("express");
const foodModel = require("../models/food");
const app = express();

app.post("/food", async (request, response) => {
  const food = new foodModel(request.body);
  try {
    await food.save();
    //insert into foodDatabase set values 
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/foods", async (request, response) => {
  const foods = await foodModel.find({});
  //selct * from table name
  try {
    response.send(foods);
  } catch (error) {
    response.status(500).send(error);
  }
});



app.patch("/food/:id", async (request, response) => {
    try {
      await foodModel.findByIdAndUpdate(request.params.id, request.body);
      response.status(200).send("done");
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  // ...

  // ...

app.delete("/food/:id", async (request, response) => {
    try {
      const food = await foodModel.findByIdAndDelete(request.params.id);
      response.status(200).send("item deleted successfully");
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  app.put('/food/:id', async (req, res) => {
    try {
      const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send(updatedFood);
    } catch (err) {
      res.status(500).send(err);
    }
  });



  /*
  main difference between PUT and PATCH methods is that PUT updates the entire resource/document, while PATCH updates only the specified fields in the document.
  */

  //try with name

  app.put('/food/:name', async (req, res) => {
    try {
      const updatedFood = await foodModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
      res.status(200).send(updatedFood);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  

module.exports = app;