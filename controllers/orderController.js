import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){

    //to check whether user logged or not
    if(!isCustomer){
        res.json({
            message: "Please login as customer to create orders"
        })
    }

    //take the latest product id

    try{
        const latestOrder = await Order.find().sort({date : -1}).limit(1)

        // if -1, to get date of the final order. +1 => first order date
        

        //to check array is empty or not
        
        let orderId

        if(latestOrder.length == 0 ){
            orderId = "CBC2400" //remove the string to a number by errasing the letters to add 1
        }else{
            const currentOrderId = latestOrder[0].orderId

            const numberString = currentOrderId.replace("CBC","")

            const number = parseInt(numberString)

            //to get a fix style => CBC0085
            const newNumber = (number +1).toString().padStart(4,"0");

            orderId = "CBC" + newNumber

        }

        const newOrderData = req.body

        const newProductArray = []

        for(let i=0; i<newOrderData.orderedItems.length;i++){
           // console.log(newOrderData.orderedItems[i])
           //no need to print. Need to load the data belongs to product id

            const product = Product.findOne({
                productId : newOrderData.orderedItems[i].productId
            })

            if(product==null){
                res.json({
                    message: "Product with id "+newOrderData.orderedItems[i].productId+" not found"
                })
                return
            }

            newProductArray[i]={
                productId : product.productId,
                price : product.price,
                quantity : newOrderData.orderedItems[i].quantity,
                image : product.image[0]
            }

        }

        console.log(newProductArray)


   //     newOrderData.orderId = orderId
   //     newOrderData.email = req.user.email

   //     const order = new Order(newOrderData)

   //     await order.save()

   //     res.json({
   //         message: "Order created"
   //     })

    }catch(error){

        //put 500 => for internel server errros
        res.status(500).json({
            message: error.message
        })
    }
}

export async function getOrders(req,res) {
    try{
        const orders = await Order.find({email : req.user.email})

        res.json(orders)
    }catch(error){
        res.stats(500).jso({
            message: error.message
        })
    }   
}