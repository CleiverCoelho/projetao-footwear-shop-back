export async function getAllproducts (req,res){
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const usercollection = db.collection("usercollection");

  if(!token) {res.sendStatus(401);}

  const session = await db.collection("sessions").findOne({ token });
  if (!session) res.sendStatus(401);

	const user = await usercollection.findOne({ 
		_id: session.userId 
	})

  if(user) {
    const productscollection = db.collection("products");
    try{
        const produtos = await productscollection.find().toArray();
        res.send(produtos)
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  } else {
    res.sendStatus(401);
  }
}

export async function getProductbyName(req,res){
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const usercollection = db.collection("usercollection");

  if(!token) {res.sendStatus(401);}

  const session = await db.collection("sessions").findOne({ token });
  if (!session) res.sendStatus(401);

	const user = await usercollection.findOne({ 
		_id: session.userId 
	})

  if(user) {
    const productscollection = db.collection("products");
    try{
        const produtos = await productscollection.find({name: req.body.name}).toArray();
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
    const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const usercollection = db.collection("usercollection");

  if(!token) {res.sendStatus(401);}

  const session = await db.collection("sessions").findOne({ token });
  if (!session) res.sendStatus(401);

	const user = await usercollection.findOne({ 
		_id: session.userId 
	})

  if(user) {
    const productscollection = db.collection("products");
    try{
        const produtos = await productscollection.find({brand: req.body.brand}).toArray();
        res.send(produtos)
    }
    catch(error){
        return res.status(500).send(err.message);
    }
  } else {
    res.sendStatus(401);
  }
}