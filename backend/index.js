const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "../.env.local" });

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const PORT = 8000;

const app = express();
app.use(cors());

app.get("/product/:keyword", (req, res) => {
  sneaks.getProducts(req.params.keyword, 9, function (err, products) {
    res.json(products);
  });
});

// app.get("/productPrice/:id", (req, res) => {
//   sneaks.getProductPrices(req.params.id, function (err, product) {
//     res.json(product);
//   });
// });

const EasyPostClient = require("@easypost/api");

const client = new EasyPostClient(process.env.REACT_APP_EASYPOST_API_KEY);

// app.get("/results", (req, res) => {
//   (async () => {
//     const tracker = await client.Tracker.create({
//       tracking_code: "EZ1000000001",
//       carrier: "USPS",
//     });
//     res.json(tracker);
//   })();
// });

console.log(PORT);
app.get("/trackingNumber/:num", (req, res) => {
  (async () => {
    const tracker = await client.Tracker.create({
      tracking_code: req.params.num,
    });
    res.json(tracker);
  })();
});
