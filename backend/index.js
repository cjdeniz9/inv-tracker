const express = require("express");
const cors = require("cors");
const SneaksAPI = require("sneaks-api");

const PORT = 8000;

const app = express();
app.use(cors());

const sneaks = new SneaksAPI();

const storedId = localStorage.getItem("id");

console.log(storedId);

app.get("/results", (req, res) => {
  sneaks.getProductPrices("CQ4277-001", function (err, product) {
    res.json(product);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
