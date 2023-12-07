const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env.local" });
// const SneaksAPI = require("sneaks-api");

const PORT = 8000;

const app = express();
app.use(cors());

// const sneaks = new SneaksAPI();

// const storedId = localStorage.getItem("id");

// console.log(storedId);

// app.get("/results", (req, res) => {
//   sneaks.getProductPrices("CQ4277-001", function (err, product) {
//     res.json(product);
//   });
// });

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

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

app.get("/trackingNumber/:num", (req, res) => {
  (async () => {
    const tracker = await client.Tracker.create({
      tracking_code: req.params.num,
    });
    res.json(tracker);
  })();
});
