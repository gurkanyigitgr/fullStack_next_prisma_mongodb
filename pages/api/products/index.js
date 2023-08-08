import { createProduct, deleteProduct, getAllProducts } from "@/prisma/product";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST": {
        const { image, title, price, category } = req.body;
        const newProduct = await createProduct(image, title, price, category);

        return res.status(201).json(newProduct);
      }

      case "GET": {
        const products = await getAllProducts();
        return res.status(200).json(products);
      }

      case "DELETE": {
        const { id } = req.query;
        await deleteProduct(id);
        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
