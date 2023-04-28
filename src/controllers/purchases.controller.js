
export async function postPurchases(req,res){
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const usercollection = db.collection("usercollection");
  const { produto, quantidade, valor } = req.body;

  if(!token) {res.sendStatus(401);}

  const session = await db.collection("sessions").findOne({ token });
  if (!session) res.sendStatus(401);

	const user = await usercollection.findOne({ 
		_id: session.userId 
	})

  if(user) {
    const purchasescollection = db.collection("purchases");
    try{
        const novacompra = await purchasescollection.insertOne({user: user.email, produto , quantidade, valor })
        res.sendStatus(201)
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  } else {
    res.sendStatus(401);
  }   
}