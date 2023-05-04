import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import joi from "joi";

export async function signUp(req, res) {
    const { name, email, password} = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        console.log(hash)
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
  };

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("E-mail não cadastrado.")

        const passwordIsCorrect = bcrypt.compareSync(password, user.password)
        if (!passwordIsCorrect) return res.status(401).send("Senha incorreta")

        const token = uuid();
        await db.collection("sessions").insertOne({ token, userId : user._id })
        return res.status(200).send({token, name: user.name})

      }  catch(error){
          return res.status(500).send(error.message);
      }
  };

  

  export async function getUserData(req,res){
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
    try{
        const pedidos = await db.collection("purchases").find({user: user.email}).toArray()
        console.log(pedidos)
        const { name, email, password } = user;
        const userepedidos = {pedidos, user};
        res.send(userepedidos);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
  } else {
    res.sendStatus(401);
  }
  }


  export async function editUser(req,res){
    const { authorization } = req.headers;
    const { name, email, password } = req.body;
    const token = authorization?.replace('Bearer ', '');
    const usercollection = db.collection("users");
  
    if(!token) {res.sendStatus(401);}
  
    const session = await db.collection("sessions").findOne({ token });
    if (!session) res.sendStatus(401);
  
    const user = await usercollection.findOne({ 
      _id: session.userId 
    })
  
    if(user) {
      const usercollection = db.collection("users");
      const newpassword = bcrypt.hashSync(password, 10);
      try{
          const usuarioatualizado = await usercollection.updateOne({email: user.email}, {$set: {email, password: newpassword, name}})
          res.send("Usuário editado");
      }
      catch(error){
          return res.status(500).send(error.message);
      }
    } else {
      res.sendStatus(401);
    }
  }

  export async function postRequests(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const usercollection = db.collection("users");
    const pedidos = req.body;
  
    if(!token) {res.sendStatus(401);}
  
    const session = await db.collection("sessions").findOne({ token });
    if (!session) res.sendStatus(401);
  
    const user = await usercollection.findOne({ 
      _id: session.userId 
    })
   
    if (user){
      try {
        await db.collection('purchases').insertOne(pedidos);
        console.log(db.collection('purchases'))
        res.status(200).send("Pedido adicionado");
      
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

    }else {
      res.sendStatus(401);
    }
  }