import express from "express"
import  { createProduct, deleteProduct, getProduct, getProductByName } from '../controllers/productController.js'

const productRouter = express.Router();


productRouter.get('/',getProduct);

productRouter.get("/filter", (req,res)=>{
    res.json({
        message: "This is product filtering area"
    })
})

//place those id getting request in last in related get or post
productRouter.get("/:name",getProductByName);

productRouter.post('/',createProduct);

productRouter.delete('/:name',deleteProduct);


export default productRouter;