import { Router } from "express";
import { productManager } from "../productManager";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query);
    if (!products.length) {
      res.status(200).json({ message: "No se encontró el producto" });
    } else {
      res.status(200).json({ message: "Producto encontrado", products });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  console.log('idProduct',idProduct);
  try {
    const product = await productManager.getProductById(+idProduct);
    if (!product) {
      res.status(400).json({ message: "User not found with the id sent" });
    } else {
      res.status(200).json({ message: "User found", product });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/",async (req, res) => {
  const { id, título, autor, descripción, precio, cantidad, género } = req.body;
  if (!id || !título || !autor|| !descripción || !precio || !cantidad ||! género) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  try {
    const newProduct = await productManager.createUser(req.body);
    req.product = newProduct
    res.redirect(`/api/productsAPI/${newProduct.id}`)
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await productManager.deleteProduct(+idProduct);
    if (response === -1) {
      res.status(400).json({ message: "Producto no encontrado con ese id" });
    } else {
      res.status(200).json({ message: "Producto eliminado" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await productManager.updateUser(+idProduct, req.body);
    if (response === -1) {
      res.status(400).json({ message: "No se encontraron productos con ese Id" });
    } else {
      res.status(200).json({ message: "Producto actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default productsRouter