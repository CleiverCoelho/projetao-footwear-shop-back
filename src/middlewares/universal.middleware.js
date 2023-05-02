
export function validamodelo(modelo){
    
    return (req,res,next) => {
        const validation = modelo.validate(req.body);
    
      if (validation.error) {
        return res.sendStatus(422);
      }
    
      next();
    }
    }