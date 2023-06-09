import { ObjectId } from "mongodb";
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
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const usercollection = db.collection("users");

  if(!token) {res.sendStatus(401);}

  const session = await db.collection("sessions").findOne({ token });
  if (!session) res.sendStatus(401);

	const user = await usercollection.findOne({ 
		_id: session.userId 
	})

  if(user) {
    const productscollection = db.collection("products");
    try{
        const produtos = await productscollection.find({busca: req.query.busca}).toArray();
        res.send(produtos)
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  } else {
    res.sendStatus(401);
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
export async function getProductbyId (req,res){

  const {id} = req.params;
  if(!id) return res.status(400).send("id nao foi passado corretamente")

  const productCollection = db.collection("products");
  if(!productCollection) return res.status(400).send("produto collecton de base")
  try{
    const produto = await productCollection.findOne({_id : new ObjectId(id)});
    if(!produto) return res.status(401).send("produto nao encontrado")
    const novoObj = {name: produto.name, color: produto.color, price: produto.price, img: produto.img, brand: produto.brand}
    // console.log({...produto})
    console.log(produto.name);
    res.send(novoObj);
  }
  catch(error){
    console.log("ERoooooooo")
      return res.status(500).send(error.message);
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
