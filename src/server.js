import express from "express";
import cartRouter from "./router/cart.router.js";
import productsRouter from "./router/products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});