const { verify } = require('jsonwebtoken');
const dbConfig = require('../config/dbConfig');

module.exports={
    checkToken: (req, res, next) => {

        let token=req.headers.authorization;
        // const token=req.cookies.verifytoken;
        res.cookie('token', token)
     
    if(token === undefined  ){
        
         
            return res.json({
                status: "Access Denied! Unauthorized User"
              });
    } else{
 
        verify(token.split(' ')[1], dbConfig.KEY_NAME, (err, authData)=>{
            if(err){
                res.json({
                    status: "Invalid Token..."
                  });
 
            } else{
                
                
               if(authData){
 
                next();
               } else{
                   return res.json({
                       status: "Access Denied!"
                     });
 
               }
            }
        })
    } 

    }
}