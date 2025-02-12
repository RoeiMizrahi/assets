const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "assets")));

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf8")
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf8")
);

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.get("/users", (req, res) => {
  const age = parseInt(req.query.age);
  if (age) {
    return res.json(users.filter((user) => user.age > age));
  }
  res.json(users);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
