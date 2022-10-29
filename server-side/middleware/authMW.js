import jwt from 'jsonwebtoken'

//auth Middleware (authMW) confirms or deny the request of liking, creating or deleting a post

const authMW = async(req, res, next)=>{

   //JSONWEBTOKEN is used to know that the User is really who he is claiming to be    
   //After the User is Signed IN-OUT he gets a TOKEN
    try {
        const token = req.headers.authorization.split(" ")[1];
        const customAuth = token.length < 500

        //If the Tokens length is greater than 500, then the user used Google Authorization
        
        let decodedData;
        if(token && customAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else{
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub;
            //sub is basically google Id
        }

        next()
        
    } catch (error) {
        console.log(error)
    }
}

export default authMW