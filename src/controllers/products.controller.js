import db from "../db.js";
import joi from "joi"



export async function getAllproducts (req,res){

  const productscollection = db.collection("products");
  try{
    if(req.body.name){
      const produtos = await productscollection.find({name: req.body.name}).toArray();
      if(produtos){
        res.send(produtos)
      }
      else{
        res.sendStatus(401);
      }
        
    }
    const produtos = await productscollection.find().toArray();
    res.send(produtos);
  }
  catch(error){
      return res.status(500).send(error.message);
  }
} 


export async function getProductbyName(req,res){
    
  
    const productscollection = db.collection("products");
    try{

        
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  
}

export async function getProductbyBrand(req,res){
  

    const productscollection = db.collection("products");
    try{
        const produtos = await productscollection.find({brand: req.params.brand}).toArray();
        res.send(produtos)
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  
}


export async function admPostProducts(req, res) {
  const product = req.body;

  const userSchema = joi.object({
    name: joi.string().required(),
    color: joi.string().required(),
    price: joi.number().precision(2).required(),
    img: joi.string().required(),
    brand: joi.string().required()
  })

  const validacao = userSchema.validate(product, {abortEarly: false})
  if (validacao.error) {
    const errors = validacao.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    await db.collection('products').insertOne(product)
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
