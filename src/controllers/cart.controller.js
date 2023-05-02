import joi from "joi";
import db from "../db.js";

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
        const cart = await db.collection("carts").findOne({ user: user.email });
        if(cart){
          res.send(cart)
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
    const {quantidades, names} = req.body;
    const useSchemaParametros = joi.object({
      quantidades: joi.array().min(1).required(),
      name: joi.array().required()
    });

    const validaRequisicao = useSchemaParametros.validate(req.body);
    if(validaRequisicao.error) {
      const errors = validaRequisicao.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  

    if(quantidades.length !== names.length){
      res.sendStatus(401)
    }
  
    const userTokenSession = await db.collection('sessions').findOne({token: userToken});
    if(!userTokenSession) return res.status(401).send('usuario nao pode fazer requisicao');
    const usercollection = db.collection("users");
    const user = await usercollection.findOne({ 
      _id: userTokenSession.userId 
    });
  
  

  
   
    try {
      let produtoscarrinho = [];
        for(const i in names){
          const produtox = await db.collection("products").findOne({name: names[i]})
          if(produtox){
            let newcartitem = {quantidade: quantidades[i], brand: produtox.brand, valor: produtox.valor, name: produtox.name, image: produtox.image}
            produtoscarrinho.push(newcartitem);
          }
          else{
            res.sendStatus(401);
          }
        }
        const newCart = {user: user.email, produtos: produtoscarrinho}
    
        await db.collection('carts').insertOne(newCart);
        res.status(200).send('produto adicionado no carrinho com suceeso');
      
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
