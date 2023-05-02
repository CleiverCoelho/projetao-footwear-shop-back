import joi from "joi";
import db from "../db.js";
import { ObjectId } from 'mongodb';

export async function getCartProducts(req, res) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const session = await db.collection("sessions").findOne({ token });
    if (!session) res.sendStatus(401);
    const usercollection = db.collection("users");
    const user = await usercollection.findOne({ 
      _id: session.userId 
    });
  

    try {
        const cart = await db.collection("cart").find({ user: user.email }).toArray();
        if(cart){
          res.send(cart);
        }
        else{
          res.sendStatus(401)
        }
        

    } catch (err) {
        res.status(500).send(err.message)
    }
  };

  export async function postCart(req, res) {

    // const userToken = req.headers.authorization;
    // para integrar com o front
    const userToken = req.headers.authorization?.replace("Bearer ", "");
    const {id} = req.params;
    console.log(id)
    if(!id) return res.status(401).send("id nao existe");
  
    const userTokenSession = await db.collection('sessions').findOne({token: userToken});
    if(!userTokenSession) return res.status(401).send('usuario nao pode fazer requisicao');
    const usercollection = db.collection("users");
    const user = await usercollection.findOne({ 
      _id: userTokenSession.userId 
    });
  
    const productOnDb = await db.collection('products').findOne({_id : new ObjectId(id)});
    if(!productOnDb) return res.status(400).send("produto nao cadastrado");
   
    try {
      // adiciona um por vez, quantidade pode ser modificada no carrinho
        const newCartProduct = {
          img: productOnDb.img, 
          user: user.email, 
          quantity: 1,
          name: productOnDb.name,
          price: productOnDb.price,
          color: productOnDb.color,
          brand: productOnDb.brand
        };
        if(!newCartProduct) return res.status(401).send("produto nao existe");

        console.log(productOnDb);
        await db.collection('cart').insertOne(newCartProduct);
        res.status(200).send(newCartProduct);
      
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function changeProductCart(req, res) {
  const id = req.params.id;
  const {quantity} = req.body; 
  if(!quantity) return res.status(401).send("quantidade deve ser enviado corretamente")

  try {
    await db.collection("cart").updateOne(
      {_id: new ObjectId(id)},
      {$set: quantity}
    )

    res.send("editado com sucesso")
  }catch(err){
    res.status(422).send(err)
  }
}

export async function deleteProduct (req, res){
  const id = req.params.id;
  if(!id) return ("Id deve ser passado corretamente");

  try {
    await db.collection('cart').deleteOne({ _id: new ObjectId(id) })

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

