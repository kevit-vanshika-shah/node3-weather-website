const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.  join(__dirname, "../public"));

const app = express(); //this method creates(generates) a new express application & store our application in app variable
const port = process.env.PORT || 3000;
//defining paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setupstatic directory to serve
app.use(express.static(publicDirectoryPath));

// seting up route & function that should be executed while visiting particular route and what to send back to users
// app.get("", (req, res) => {
//   //first arg is partial url
//   res.send("<h1>Weather</h1>"); //sending html data
// });

app.get("", (req, res) => {
  //setting up route for dynamic content stored in hbs file of views folder
  res.render("index", {
    title: "Weather Info",
    name: "El Cooper",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mike Hanningan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Veronika",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast: "It is cold!",
  //   location: "Silican Valley",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // res.send("Help article not found");
  res.render("404", {
    title: "404",
    name: "Max",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  // res.send("My 404 page");
  res.render("404", {
    title: "404",
    name: "Vanshika",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
