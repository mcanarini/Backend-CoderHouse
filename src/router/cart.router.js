import { Router } from "express";
import { productManager } from "../productManager";

const router = Router();

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  console.log('idProduct',idProduct);
  try {
    const product = await usersManager.getUserById(+idProduct);
    if (!product) {
      res.status(400).json({ message: "User not found with the id sent" });
    } else {
      res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/",async (req, res) => {
  const  { id, título, autor, descripción, precio, cantidad, género } = req.body;
  if (!id || !título || !autor|| !descripción || !precio || !cantidad ||! género){
    return res.status(400).json({ message: "Fata información" });
  }
  try {
    const newProduct = await productManager.createProduct(req.body);
    req.product = newProduct
    res.redirect(`/api/signupresponse/${newProduct.id}`)
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
    const response = await productManager.updateProduct(+idProduct, req.body);
    if (response === -1) {
      res.status(400).json({ message: "Producto no encontrado con ese id" });
    } else {
      res.status(200).json({ message: "Producto actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default cartRouter