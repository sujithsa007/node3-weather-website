const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engines and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sujith S A",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Aiswarya Sujith" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This page is the helper page",
    name: "Niranjan S A",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error !== undefined) {
        // return console.log("Error: ", error);
        return res.send({
          error: error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error !== undefined) {
          // return console.log("Error: ", error);
          return res.send({
            error,
          });
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
        // console.log(location);
        // console.log(forecastData);
      });
    }
  );
  // res.send({
  //   forecast: "Its 50 degrees",
  //   location: "Balaramapuram",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    errMessage: "Help article not found",
    name: "Niranjan S A",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    errMessage: "Page not found",
    name: "Niranjan S A",
  });
});

//Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
