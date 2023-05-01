import { func, valid } from "joi";
import db from "../db.js";

export async function getCartProducts(req, res) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const session = await db.collection("sessions").findOne({ token });
    if (!session) res.sendStatus(401);

    try {
        const user = await db.collection("cart").findOne({ idUser: session.idUser });

        await db.collection("users").insertOne({ name, email, password: hash });
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
  };

  export async function addCartProduct(req, res) {

    // const userToken = req.headers.authorization;
    // para integrar com o front
    const userToken = req.headers.authorization?.replace("Bearer ", "");
    const {quantidade, name} = req.body;
  
    const userTokenSession = await db.collection('sessions').findOne({token: userToken});
    if(!userTokenSession) return res.status(401).send('usuario nao pode fazer requisicao');
  
  
    const useSchemaParametros = joi.object({
      price: joi.number().precision(2).required(),
      color: joi.string().required(),
      size: joi.string().required()
    });
  
    const validaRequisicao = useSchemaParametros.validate(req.body);
    if(validaRequisicao.error) {
      const errors = validaRequisicao.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    try {
        const produtoescolhido = db.collection("products").findOne({name})
        const newProduct = {quantidade, valor: produtoescolhido.valor, name, brand: produtoescolhido.brand, user: user.email, image: produtoescolhido.image}
    
        await db.collection('cart').insertOne(newProduct);
        res.status(200).send('produto adicionado no carrinho com suceeso');
      
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
