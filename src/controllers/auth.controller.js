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
    const purchasescollection = db.collection("purchases");
    try{
        const pedidos = await purchasescollection.find({user: user.email}).toArray()
        const { name, email, password } = user;
        const userepedidos = {pedidos, name, email, password};
        res.send(userepedidos);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
  } else {
    res.sendStatus(401);
  }
  }